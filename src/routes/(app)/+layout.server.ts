import { validateUser } from "$lib/types";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  // Check if the user is authenticated by validating their auth token.
  if (
    locals.pocketBase.authStore.isValid && // Ensure the user is logged in.
    validateUser(locals.pocketBase.authStore.model) // Validate the user's authentication model.
  ) {
    return {
      authenticated: true, // Indicate the user is authenticated.
      authModel: locals.pocketBase.authStore.model, // Return the user's auth model (user info).
    };
  }

  // If the user is not authenticated or validation fails, return authentication status as false.
  return {
    authenticated: locals.pocketBase.authStore.isValid, // If the token is valid but validation failed, return the token validity.
    authModel: undefined, // No user data (auth model) available when not authenticated or validation fails.
  };
}) satisfies LayoutServerLoad; // Ensure the function conforms to the expected LayoutServerLoad type.
