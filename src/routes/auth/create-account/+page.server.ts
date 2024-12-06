import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ locals, request }) => {
    // If the user is already logged in, redirect them to the home page
    if (locals.pocketBase.authStore.isValid) {
      throw redirect(303, "/");
    }

    // Parse the form data from the request
    let formData = await request.formData();

    let name = formData.get("name"); // Extract the name field
    let email = formData.get("email"); // Extract the email field
    let password = formData.get("password"); // Extract the password field

    try {
      // Validate the name field
      if (typeof name !== "string") {
        throw new Error("Invalid name");
      }
      if (name.length < 1) {
        throw new Error("Name cannot be empty");
      }

      // Validate the email field
      if (typeof email !== "string") {
        throw new Error("Invalid email");
      }
      if (email.length < 1) {
        throw new Error("Email cannot be empty");
      }

      // Validate the password field
      if (typeof password !== "string") {
        throw new Error("Invalid password");
      }
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      // Check if a user with the same name already exists
      const userWithNameExists = await locals.pocketBase
        .collection("users")
        .getFirstListItem(`name="${name}"`)
        .catch(() => undefined); // Ignore errors if the user does not exist

      if (userWithNameExists) {
        throw new Error("Name is already taken");
      }

      // Create a new user in the PocketBase database
      await locals.pocketBaseAdmin.collection("users").create({
        name,
        password,
        passwordConfirm: password, // Confirm password field is required
        email,
        emailVisibility: false, // Keep email visibility off by default
      });

      // Automatically log in the user after account creation
      await locals.pocketBase
        .collection("users")
        .authWithPassword(email, password);
    } catch (error) {
      // Handle errors during validation or account creation
      if (error instanceof Error) {
        return {
          name: typeof name !== "string" ? "" : name, // Preserve form inputs for user convenience
          email: typeof email !== "string" ? "" : email,
          password: typeof password !== "string" ? "" : password,
          message: error.message, // Return the specific error message
        };
      }

      // Fallback for unknown errors
      return {
        name: typeof name !== "string" ? "" : name,
        email: typeof email !== "string" ? "" : email,
        password: typeof password !== "string" ? "" : password,
        message: "Unknown error occurred while trying to create an account",
      };
    }

    // Redirect the user to the home page after successful account creation
    throw redirect(303, "/");
  },
};
