import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
  // Clear the PocketBase auth session
  locals.pocketBase.authStore.clear();

  // Redirect the user back to the homepage or another page after logging out
  throw redirect(303, '/');
};
