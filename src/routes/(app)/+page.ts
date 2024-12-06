import type PocketBase from "pocketbase";  // Importing PocketBase types
import type { RecordModel } from "pocketbase";  // Importing the RecordModel type from PocketBase
import { pb } from "$lib/pocketbase";  // Importing the PocketBase instance from the lib
import { get } from "svelte/store";  // Importing the get function to access Svelte stores
import type { PageLoad } from "./$types";  // Importing the type for the PageLoad function
import { validatePost, type Post } from "$lib/types";  // Importing the validatePost function and Post type from lib/types

export const load = (async ({ params }) => {  // The main load function to fetch the page data
  let pbInstance = get(pb);  // Getting the current PocketBase instance from the store

  if (!pbInstance) {  // If there's no PocketBase instance available, return a "not-found" result
    return {
      result: {
        "not-found": true,  // Mark the result as "not-found"
      },
    };
  }

  try {
    // Async function to fetch posts from the PocketBase collection
    async function getPosts(pbInstance: PocketBase) {
      const posts = await pbInstance.collection("posts").getList(1, 15, {  // Fetch the first 15 posts
        expand: "user",  // Expand the user details for each post
        sort: "-created",  // Sort the posts by creation date in descending order
      });

      // Reduce the fetched posts into a filtered and properly formatted list
      return posts.items.reduce<(Post & RecordModel)[]>((prev, cur) => {
        let post = cur;

        if (!cur.expand) {  // If there's no expanded data for the user, skip this post
          return prev;
        }

        post.user = cur.expand.user;  // Attach the expanded user data to the post

        if (!validatePost(post)) {  // If the post is invalid based on custom validation, skip it
          return prev;
        }

        return [...prev, post];  // Add the valid post to the result array
      }, []);
    }

    // Returning the result with the posts data fetched
    return {
      result: {
        posts: getPosts(pbInstance),  // Assign the posts fetching function to the result
      },
    };
  } catch (error) {  // If there's an error during the fetching process, return a "not-found" result
    return {
      result: {
        "not-found": true,  // Mark the result as "not-found" in case of an error
      },
    };
  }
}) satisfies PageLoad;  // Satisfying the PageLoad type for SvelteKit
