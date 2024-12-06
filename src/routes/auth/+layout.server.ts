import { redirect } from "@sveltejs/kit"; 
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  // Check if the user is already authenticated in PocketBase
  if (locals.pocketBase.authStore.isValid) {
    // If authenticated, redirect to the homepage with a 303 HTTP status
    throw redirect(303, "/");
  }

  // Return an empty object if the user is not authenticated
  return {};
}) satisfies LayoutServerLoad; 
