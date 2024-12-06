import { pb } from "$lib/pocketbase"; // Importing the PocketBase instance
import { get } from "svelte/store"; // Importing the 'get' function to access the current store value
import type { PageLoad } from "./$types"; // Importing type for the load function
import { validatePost, validateUser, type Post } from "$lib/types"; // Importing validation functions and types
import type { RecordModel } from "pocketbase"; // Importing PocketBase's RecordModel type

// The load function fetches data for the page
export const load = (async ({ params }) => {
  let pbInstance = get(pb); // Getting the PocketBase instance from the store

  // If the PocketBase instance is not found, return a "not-found" result
  if (!pbInstance) {
    return {
      result: {
        "not-found": true,
      },
    };
  }

  try {
    // Fetch user data using the provided user ID from params
    const user = await pbInstance.collection("users").getOne(params.id);

    // If the user data is invalid, throw an error
    if (!validateUser(user)) {
      throw new Error("Post not found");
    }

    // Function to fetch the posts for the user
    async function getPosts() {
      if (!pbInstance) {
        // If the PocketBase instance is not found, throw an error
        throw new Error("User not found");
      }

      // Fetch posts associated with the user
      const posts = await pbInstance
        .collection("posts")
        .getFullList<Post & RecordModel>({
          filter: `user="${user.id}"`, // Filter posts by the user's ID
          expand: "user", // Expand the user field in the posts
        });

      // Process the posts to ensure they're valid and include the expanded user data
      return posts.reduce<(Post & RecordModel)[]>((prev, cur) => {
        let post = cur;

        if (!cur.expand) {
          // If there's no expanded user data, skip this post
          return prev;
        }

        post.user = cur.expand.user; // Attach the user data to the post

        // Validate the post, and if valid, add it to the result array
        if (!validatePost(post)) {
          return prev; // Skip invalid posts
        }

        return [...prev, post]; // Add the valid post to the list
      }, []);
    }

    // Return the user data and the fetched posts
    return {
      result: {
        user,
        posts: getPosts(), // Calling the function to fetch posts
      },
    };
  } catch (error) {
    // If any error occurs, return a "not-found" result
    return {
      result: {
        "not-found": true,
      },
    };
  }
}) satisfies PageLoad; // Ensure this follows the PageLoad type
