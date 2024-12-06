import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url }) => {
  // Check if the current URL's path is exactly "/auth"
  if (url.pathname === "/auth") {
    // Redirect the user to "/auth/create-account" with a 303 HTTP status
    throw redirect(303, "/auth/create-account");
  }
}) satisfies PageServerLoad; 
