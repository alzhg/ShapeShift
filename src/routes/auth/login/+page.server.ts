import { redirect } from "@sveltejs/kit"; // Import redirect utility from SvelteKit

export const actions = {
  default: async ({ locals, request }) => {
    // If the user is already logged in, send them to the homepage
    if (locals.pocketBase.authStore.isValid) {
      throw redirect(303, "/");
    }

    // Parse the form data from the request
    let formData = await request.formData();
    let email = formData.get("email");
    let password = formData.get("password");

    try {
      // Validate the email format
      if (typeof email !== "string") {
        throw new Error("Invalid email");
      }
      if (email.length < 1) {
        throw new Error("Email cannot be empty");
      }

      // Validate the password format
      if (typeof password !== "string") {
        throw new Error("Invalid password");
      }
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      // Attempt to authenticate with PocketBase using email and password
      await locals.pocketBase
        .collection("users")
        .authWithPassword(email, password);
    } catch (error) {
      // Handle errors gracefully by returning a helpful message
      if (error instanceof Error) {
        return {
          email: typeof email !== "string" ? "" : email, // Return email for user convenience
          password: typeof password !== "string" ? "" : password, // Clear password for security
          message: error.message, // Pass along the error message
        };
      }

      // Fallback for unexpected errors
      return {
        email: typeof email !== "string" ? "" : email,
        password: typeof password !== "string" ? "" : password,
        message: "Unknown error occurred while trying to create an account",
      };
    }

    // If everything is successful, redirect to the homepage
    throw redirect(303, "/");
  },
};
