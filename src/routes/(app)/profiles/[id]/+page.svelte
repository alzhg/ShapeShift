<script lang="ts">
  // Importing necessary components and PocketBase instance
  import Button from "$lib/components/Button.svelte";
  import PostComponent from "$lib/components/PostComponent.svelte";
  import { pb } from "$lib/pocketbase"; // PocketBase instance for interacting with data
  import type { PageData } from "./$types";

  export let data: PageData; // Receiving data from the parent component

  let { result } = data; // Destructuring to access 'result' from the passed data
</script>

<svelte:head>
  <!-- Dynamically setting the page title based on the user's name, or a fallback if no user is found -->
  <title>{result.user ? result.user.name : "User not found"} - CS</title>
</svelte:head>

<div class="container">
  <header>
    {#if result.user}  <!-- Check if a user is found in the result -->
      <div class="first-row">
        <div class="user-information">
          {#if $pb && result.user.photo}  <!-- Check if PocketBase instance exists and user has a photo -->
            <img
              src={$pb.getFileUrl(result.user, result.user.photo)}  
              alt={result.user.name} 
            />
          {:else}  <!-- Fallback if no photo exists -->
            <iconify-icon icon="mingcute:user-4-fill"></iconify-icon> <!-- Display a default user icon -->
          {/if}

          <h1>{result.user.name}</h1>  <!-- Display user's name -->
        </div>
      </div>

      {#if result.user.bio}  <!-- Check if the user has a bio -->
        <hr />

        <p class="bio">{result.user.bio}</p>  <!-- Display user's bio -->
      {/if}
    {:else}  <!-- Fallback if no user data exists -->
      <h1 class="not-found">{"User not found"}</h1>  <!-- Show "User not found" message -->
    {/if}
  </header>

  {#if result.posts}  <!-- Check if posts exist for the user -->
    {#await result.posts}  <!-- Await the result of posts fetching -->
      <article>
        <h1>Loading Posts</h1>  <!-- Display loading message while posts are being fetched -->
      </article>
    {:then posts}  <!-- Once posts are fetched successfully -->
      {#each posts as post}  <!-- Loop through each post -->
        <article>
          <PostComponent authModel={data.authModel} {post} />  <!-- Render each post using PostComponent -->
        </article>
      {:else}  <!-- Fallback if no posts exist -->
        <p>No posts found</p>  <!-- Display a message when no posts are found -->
      {/each}
    {/await}
  {/if}
</div>

<style>
  .container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  article,
  header {
    background-color: var(--primary-color);
    border-radius: 8px;
    border: solid 1px var(--tertiary-color);
    max-width: 40rem;
    flex-grow: 1;
    width: 60vw;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }

  article {
    gap: 1rem;
  }

  header {
    gap: 12px;
  }

  hr {
    border: none;
    border-top: 1px solid var(--tertiary-color);
  }

  .first-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-information {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  h1 {
    font-size: 20px;
    font-weight: 400;
  }

  h1.not-found {
    text-align: center;
  }

  img {
    height: 40px;
    width: 40px;
    object-fit: cover;
  }

  iconify-icon {
    font-size: 40px;
  }
</style>
