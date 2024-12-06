import { validateUser } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

// Load function to check if the user is authenticated and valid
export const load = (async ({ locals }) => {
  // If the user is not authenticated or invalid, redirect to the authentication page
  if (
    !locals.pocketBase.authStore.isValid ||
    !validateUser(locals.pocketBase.authStore.model)
  ) {
    throw redirect(303, "/auth");
  }

  // Return the authenticated user's data
  return {
    authModel: locals.pocketBase.authStore.model,
  };
}) satisfies PageServerLoad;

// Actions to handle various user profile updates
export const actions = {
  // Logout action to clear authentication and redirect to login
  logout: async ({ locals }) => {
    // Check if user is authenticated before proceeding
    if (
      !locals.pocketBase.authStore.isValid ||
      !validateUser(locals.pocketBase.authStore.model)
    ) {
      throw redirect(303, "/auth");
    }

    try {
      // Clear the user's authentication details
      locals.pocketBase.authStore.clear();
    } catch (error) {
      // Handle errors during logout
      if (error instanceof Error) {
        return {
          error: "log-out",
          message: error.message,
        };
      }

      return {
        error: "log-out",
        message: "An error occurred while logging out.",
      };
    }

    // Redirect to the authentication page after successful logout
    throw redirect(303, "/auth");
  },

  // Change profile photo action
  changeProfilePhoto: async ({ locals, request }) => {
    // Ensure the user is authenticated before allowing profile photo change
    if (
      !locals.pocketBase.authStore.isValid ||
      !validateUser(locals.pocketBase.authStore.model)
    ) {
      throw redirect(303, "/auth");
    }

    const formData = await request.formData();
    const photo = formData.get("photo");

    try {
      // Validate the photo input
      if (!(photo instanceof File)) {
        throw new Error("Invalid photo");
      }

      // Check if the photo size is valid
      if (photo.size === 0) {
        throw new Error("Invalid photo");
      }

      // Update the user's profile photo in the database
      await locals.pocketBaseAdmin
        .collection("users")
        .update(locals.pocketBase.authStore.model.id, { photo });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return {
          error: "change-profile-photo",
          message: error.message,
        };
      }

      return {
        error: "change-profile-photo",
        message: "An error occurred while changing profile photo.",
      };
    }

    // Redirect to the settings page after successfully updating the photo
    throw redirect(303, "/settings");
  },

  // Remove profile photo action
  removeProfilePhoto: async ({ locals }) => {
    // Ensure the user is authenticated before allowing profile photo removal
    if (
      !locals.pocketBase.authStore.isValid ||
      !validateUser(locals.pocketBase.authStore.model)
    ) {
      throw redirect(303, "/auth");
    }

    try {
      // Update the user's profile to remove the photo
      await locals.pocketBaseAdmin
        .collection("users")
        .update(locals.pocketBase.authStore.model.id, { photo: null });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return {
          error: "remove-profile-photo",
          message: error.message,
        };
      }

      return {
        error: "remove-profile-photo",
        message: "An error occurred while removing profile photo.",
      };
    }

    // Redirect to the settings page after successfully removing the photo
    throw redirect(303, "/settings");
  },

  // Change user name action
  changeName: async ({ locals, request }) => {
    // Check authentication before proceeding with name change
    if (
      !locals.pocketBase.authStore.isValid ||
      !validateUser(locals.pocketBase.authStore.model)
    ) {
      throw redirect(303, "/auth");
    }

    const formData = await request.formData();
    const name = formData.get("name");

    try {
      // Validate the name input
      if (typeof name !== "string") {
        throw new Error("Invalid name");
      }

      if (name.length === 0) {
        throw new Error("Invalid name");
      }

      // Update the user's name in the database
      await locals.pocketBaseAdmin
        .collection("users")
        .update(locals.pocketBase.authStore.model.id, { name });
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: "change-name",
          message: error.message,
        };
      }

      return {
        error: "change-name",
        message: "An error occurred while changing name.",
      };
    }

    // Redirect to settings after name change
    throw redirect(303, "/settings");
  },

  // Change user email action
  changeEmail: async ({ locals, request }) => {
    // Ensure the user is authenticated before changing the email
    if (
      !locals.pocketBase.authStore.isValid ||
      !validateUser(locals.pocketBase.authStore.model)
    ) {
      throw redirect(303, "/auth");
    }

    const formData = await request.formData();
    const email = formData.get("email");

    try {
      // Validate the email input
      if (typeof email !== "string") {
        throw new Error("Invalid email");
      }

      if (email.length === 0) {
        throw new Error("Invalid email");
      }

      // Update the user's email in the database
      await locals.pocketBaseAdmin
        .collection("users")
        .update(locals.pocketBase.authStore.model.id, { email });
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: "change-email",
          message: error.message,
        };
      }

      return {
        error: "change-email",
        message: "An error occurred while changing email.",
      };
    }

    // Redirect to settings after email change
    throw redirect(303, "/settings");
  },

  // Change user bio action
  changeBio: async ({ locals, request }) => {
    // Ensure the user is authenticated before updating bio
    if (
      !locals.pocketBase.authStore.isValid ||
      !validateUser(locals.pocketBase.authStore.model)
    ) {
      throw redirect(303, "/auth");
    }

    const formData = await request.formData();
    const bio = formData.get("bio");

    try {
      // Validate the bio input
      if (typeof bio !== "string") {
        throw new Error("Invalid bio");
      }

      if (bio.length === 0) {
        throw new Error("Invalid bio");
      }

      // Update the user's bio in the database
      await locals.pocketBaseAdmin
        .collection("users")
        .update(locals.pocketBase.authStore.model.id, { bio });
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: "change-bio",
          message: error.message,
        };
      }

      return {
        error: "change-bio",
        message: "An error occurred while changing bio.",
      };
    }

    // Redirect to settings after bio change
    throw redirect(303, "/settings");
  },

  // Delete user account action
  deleteAccount: async ({ locals }) => {
    // Ensure the user is authenticated before proceeding with account deletion
    if (
      !locals.pocketBase.authStore.isValid ||
      !validateUser(locals.pocketBase.authStore.model)
    ) {
      throw redirect(303, "/auth");
    }

    try {
      // Delete the user's account from the database
      await locals.pocketBaseAdmin
        .collection("users")
        .delete(locals.pocketBase.authStore.model.id);

      // Clear the user's authentication details
      locals.pocketBase.authStore.clear();
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: "delete-account",
          message: error.message,
        };
      }

      return {
        error: "delete-account",
        message: "An error occurred while deleting a user.",
      };
    }

    // Redirect to the login page after account deletion
    throw redirect(303, "/auth");
  },
};
