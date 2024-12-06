<script lang="ts">
  import PostComponent from "$lib/components/PostComponent.svelte";  // Importing the PostComponent to display each post
  import type { PageData } from "./$types";  // Importing the type for page data

  export let data: PageData;  // Declaring the data variable to receive the page data
</script>

<svelte:head>
  <title>Home - ShapeShift</title>  <!-- Setting the page title -->
</svelte:head>

<div class="container">
  <!-- Conditional rendering based on the data returned from the backend -->
  {#if data.result["not-found"]}  <!-- Checking if no posts were found -->
      <article><h1>No posts found</h1></article>  <!-- Display this message if no posts exist -->
  {:else if data.result.posts}  <!-- If posts exist, display them -->
      {#await data.result.posts}  <!-- Wait for the posts data to load -->
          <article><h1>Loading posts</h1></article>  <!-- Display a loading message while waiting -->
      {:then posts}  <!-- Once the posts are fetched, loop through them -->
          {#each posts as post}  <!-- Loop through each post -->
              <article>
                  <PostComponent authModel={data.authModel} {post} />  <!-- Display each post using the PostComponent -->
              </article>
          {:else}  <!-- If no posts exist, show a fallback message -->
              <article><h1>No posts found</h1></article>
          {/each}
      {/await}
  {/if}
</div>

<style>
  .container {
      padding: 1rem;
      display: flex;
      flex-direction: column;  /* Stack items vertically */
      align-items: center;  /* Center the content horizontally */
      flex-wrap: wrap;  /* Allow items to wrap onto the next line */
      gap: 1rem;  /* Add space between items */
  }

  article {
      background-color: var(--primary-color);  /* Set background color for each post */
      border-radius: 8px;  /* Round the corners of the post container */
      border: solid 1px var(--tertiary-color);  /* Add a border with a lighter color */
      max-width: 40rem;  /* Set a maximum width for the posts */
      flex-grow: 1;  /* Allow the post container to grow */
      width: 60vw;  /* Set width to 60% of the viewport width */
      padding: 1rem;  /* Add padding inside the post container */
      display: flex;
      flex-direction: column;  /* Stack the content vertically within each post */
      gap: 12px;  /* Add space between the elements inside each post */
  }
</style>
