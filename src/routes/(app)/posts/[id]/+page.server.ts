import { validatePost, validateUser, type Post } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { RecordModel } from "pocketbase";

// Load function for the page, currently not fetching any data.
export const load = (async () => {
  return {}; // Empty object for now
}) satisfies PageServerLoad;

export const actions = {
  // Action to toggle the "liked" status of a post
  toggleLiked: async ({ locals, params, url }) => {
    const authModel = locals.pocketBase.authStore.model; // Get the current authenticated user model

    // If the user is not logged in, redirect to the login page
    if (!locals.pocketBase.authStore.isValid || !validateUser(authModel)) {
      throw redirect(303, "/auth"); // Redirect to the authentication page
    }

    try {
      // Fetch the post from PocketBase, including the expanded user data
      const postRecord = await locals.pocketBase
        .collection("posts")
        .getOne<Post & RecordModel>(params.id, { expand: "user" });

      let post = postRecord;

      // If the post doesn't have the expanded user data, throw an error
      if (!postRecord.expand) {
        throw new Error(`Invalid post`);
      }

      // Attach the user info to the post object
      post.user = postRecord.expand.user;

      // Validate the post structure to ensure it has the correct data
      if (!validatePost(post)) {
        throw new Error(`Invalid post`);
      }

      // Check if the user has already liked the post
      const isLiked = post.likes.includes(authModel.id);

      // If already liked, remove the user's ID from the "likes" field
      if (isLiked) {
        await locals.pocketBaseAdmin.collection("posts").update(params.id, {
          "likes-": authModel.id, // Remove the like
        });
      } else {
        // Otherwise, add the user's ID to the "likes" field
        await locals.pocketBaseAdmin.collection("posts").update(params.id, {
          "likes+": authModel.id, // Add the like
        });
      }
    } catch (error) {
      console.log(error); // Log any errors that occur during the process

      // Return a message in case of an error
      if (error instanceof Error) {
        return {
          message: error.message, // Specific error message
        };
      }

      // Fallback error message for unknown errors
      return {
        message: "Unknown error occurred when trying to like post",
      };
    }

    // Check if there's a custom redirect path in the URL search params
    const customRedirectPath = url.searchParams.get("redirect");

    if (customRedirectPath) {
      // If a redirect path is specified, redirect to it
      throw redirect(303, `${url.origin}${customRedirectPath}`);
    }

    // Otherwise, redirect back to the post page
    throw redirect(303, `/posts/${params.id}`);
  },

  // Action to delete a post
  deletePost: async ({ locals, params }) => {
    const authModel = locals.pocketBase.authStore.model; // Get the current authenticated user model

    // If the user is not logged in, redirect to the login page
    if (!locals.pocketBase.authStore.isValid || !validateUser(authModel)) {
      throw redirect(303, "/auth"); // Redirect to the authentication page
    }

    try {
      // Fetch the post from PocketBase, including the expanded user data
      const postRecord = await locals.pocketBase
        .collection("posts")
        .getOne<Post & RecordModel>(params.id, { expand: "user" });

      let post = postRecord;

      // If the post doesn't have the expanded user data, throw an error
      if (!postRecord.expand) {
        throw new Error(`Invalid post`);
      }

      // Attach the user info to the post object
      post.user = postRecord.expand.user;

      // Validate the post to ensure it has the correct data
      if (!validatePost(post)) {
        throw new Error(`Invalid post`);
      }

      // Check if the logged-in user is the owner of the post
      const ownsPost = post.user.id === authModel.id;

      // If the user doesn't own the post, they can't delete it
      if (!ownsPost) {
        throw new Error(`Cannot delete post`);
      }

      // Proceed with deleting the post from PocketBase
      await locals.pocketBaseAdmin.collection("posts").delete(params.id);
    } catch (error) {
      console.log(error); // Log any errors that occur during the process

      // Return a message in case of an error
      if (error instanceof Error) {
        return {
          message: error.message, // Specific error message
        };
      }

      // Fallback error message for unknown errors
      return {
        message: "Unknown error occurred when trying to delete post",
      };
    }

    // Redirect back to the homepage after successful post deletion
    throw redirect(303, `/`);
  },
};
