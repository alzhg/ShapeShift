<script lang="ts">
    import type { PageData } from "./$types";
    import PostComponent from "$lib/components/PostComponent.svelte";
    import { onMount } from "svelte";
  
    export let data: PageData;
  
    // Reactive variable to store the post
    let post = data.post;
  
    // Function to update post after liking/unliking
    function updatePost(updatedPost) {
      post = updatedPost;
    }
  
    // Ensuring we set the post if it changes or initially mounts
    onMount(() => {
      if (data.post) {
        post = data.post;
      }
    });
  </script>
  
  <svelte:head>
    <title>{post ? post.title : "Post not found"}</title>
  </svelte:head>
  
  <div class="container">
    <article>
      {#if data["not-found"]}
        <p class="not-found">Post not found</p>
      {:else if post}
        <PostComponent {post} authModel={data.authModel} on:postUpdated={updatePost} />
      {/if}
    </article>
  </div>
  
  <style>
    .container {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;
    }
  
    article {
      background-color: var(--primary-color);
      border-radius: 8px;
      width: 45rem;
      max-width: 60vw;
      flex-grow: 1;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  </style>
  