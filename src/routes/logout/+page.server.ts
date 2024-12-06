import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
  // Clear the PocketBase auth session
  locals.pocketBase.authStore.clear();

  // Redirect the user back to the homepage after logging out
  throw redirect(303, '/auth/create-account/');
};
