import { validateUser } from "$lib/types";  // Importing the function to validate user data
import { redirect } from "@sveltejs/kit";  // Importing the redirect utility from SvelteKit
import type { PageServerLoad } from "./$types";  // Importing the type for server-side load function

// The main load function checks if the user is authenticated and valid
export const load = (async ({ locals }) => {
  // Check if the PocketBase authentication store is valid and if the user is validated
  if (
    !locals.pocketBase.authStore.isValid ||  // If the user is not authenticated
    !validateUser(locals.pocketBase.authStore.model)  // Or if the user data is invalid
  ) {
    throw redirect(303, "/auth");  // Redirect the user to the authentication page
  }

  return {};  // Return an empty object if everything is valid
}) satisfies PageServerLoad;  // Satisfying the PageServerLoad type from SvelteKit

// Actions object handling the creation of a new post
export const actions = {
  newPost: async ({ locals, request }) => {
    const authModel = locals.pocketBase.authStore.model;  // Get the authenticated user's model

    // If the user is not authenticated or the user data is invalid, redirect them to the auth page
    if (!locals.pocketBase.authStore.isValid || !validateUser(authModel)) {
      throw redirect(303, "/auth");
    }

    const formData = await request.formData();  // Extract form data from the request

    // Extracting the individual fields from the form data
    const title = formData.get("title");
    const content = formData.get("content");
    const language = formData.get("language");
    const tags = formData.get("tags");
    const photo = formData.get("photo");

    let postId;  // Initialize a variable to hold the post ID once created

    try {
      // Validating the form data for title, content, language, tags, and photo

      // Check if title is a string and not empty
      if (typeof title !== "string") {
        throw new Error("Invalid title");
      }

      if (title.length === 0) {
        throw new Error("Title cannot be empty");
      }

      // Check if content is a string and not empty
      if (typeof content !== "string") {
        throw new Error("Invalid content");
      }

      if (content.length === 0) {
        throw new Error("Content cannot be empty");
      }

      // Check if language is a string and not empty
      if (typeof language !== "string") {
        throw new Error("Invalid language");
      }

      if (language.length === 0) {
        throw new Error("Language cannot be empty");
      }

      // Ensure tags is a string
      if (typeof tags !== "string") {
        throw new Error("Invalid tags");
      }

      // Ensure photo is a string
      if (typeof photo !== "string") {
        throw new Error("Invalid photo");
      }

      // Parse tags from JSON and validate it
      const parsedTags = JSON.parse(tags);

      if (!Array.isArray(parsedTags)) {
        throw new Error("Invalid tags");
      }

      let validatedTags: string[] = [];  // Array to hold validated tags

      // Validate individual tags and ensure no duplicates
      for (const tag of parsedTags) {
        if (typeof tag !== "string") {
          throw new Error("Invalid item in tags");
        }

        if (validatedTags.includes(tag)) {
          throw new Error("Cannot have duplicate tag");
        }

        validatedTags.push(tag);  // Add valid tag to the validatedTags array
      }

      // Ensure the number of tags is between 1 and 10
      if (validatedTags.length === 0 || validatedTags.length > 10) {
        throw new Error("Invalid tags");
      }

      // Create the post record in the PocketBase collection
      const record = await locals.pocketBaseAdmin.collection("posts").create({
        title,
        content,
        tags: validatedTags,
        language,
        user: authModel.id,  // Assign the current user's ID to the post
        photo
      });

      postId = record.id;  // Store the newly created post ID
    } catch (error) {
      console.log(error);  // Log the error to the console

      // If an error occurs, return the error message
      if (error instanceof Error) {
        return {
          message: error.message,
        };
      }

      return {
        message: "An error occurred while uploading post.",
      };
    }

    // If a post ID was generated, redirect to the newly created post
    if (postId) {
      throw redirect(303, `/posts/${postId}`);
    }

    // If no post ID is generated, redirect to the homepage
    throw redirect(303, "/");
  },
};
