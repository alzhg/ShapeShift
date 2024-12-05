<script lang="ts">
  import type { Post, User } from "$lib/types";
  import type { RecordModel } from "pocketbase";
  import Button from "./Button.svelte";
  import { pb } from "$lib/pocketbase";
  import { enhance } from "$app/forms";
  import { fade } from "svelte/transition";
  import Highlight from "highlight.js";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  export let post: Post & RecordModel;
  export let authModel: User | undefined;

  let contentRef: HTMLElement | undefined;

  onMount(() => {
    if (!contentRef || !post) {
      return;
    }

    Highlight.highlightElement(contentRef);
  });
</script>

<header>
  <h1>{post.title}</h1>

  <!-- Display the post photo if available -->
  {#if post.photo}
    <img
      src={post.photo}
      alt="{post.title} image"
      class="post-photo"
    />
  {/if}

  {#if authModel && post.user.id === authModel.id}
    <form action="/posts/{post.id}?/deletePost" method="post">
      <Button size="icon" variant="destructive">
        <iconify-icon icon="ph:trash"></iconify-icon>
      </Button>
    </form>
  {/if}
</header>

<pre>
  <code bind:this={contentRef}>{post.content}</code>
</pre>

<section class="tags">
  {#each post.tags as tag}
    <div class="tag">
      <span>
        {tag}
      </span>
    </div>
  {/each}
</section>

<section class="actions">
  <a href="/profiles/{post.user.id}" class="account">
    {#if $pb && post.user.photo}
      <img
        src={$pb.getFileUrl(post.user, post.user.photo)}
        alt={post.user.name}
      />
    {:else}
      <iconify-icon icon="ic:round-account-circle"></iconify-icon>
    {/if}

    <p>{post.user.name}</p>
  </a>

  <div class="interactions">
    {#if authModel}
      <form
        action="/posts/{post.id}?/toggleLiked&redirect={$page.url.pathname}"
        method="post"
        use:enhance={() => {
          if (post && authModel) {
            if (post.likes.includes(authModel.id)) {
              let { id } = authModel;
              post.likes = post.likes.filter((user) => user !== id);
            } else {
              post.likes = [...post.likes, authModel.id];
            }
          }

          return async ({ update }) => {
            await update({ invalidateAll: true, reset: true });
          };
        }}
      >
        <Button size="icon" variant="ghost">
          {#key post.likes}
            <iconify-icon
              in:fade={{ duration: 200 }}
              icon="mdi:heart{post.likes.includes(authModel.id)
                ? ''
                : '-outline'}"
              class:liked={post.likes.includes(authModel.id)}
            ></iconify-icon>
          {/key}
        </Button>
      </form>
    {/if}
  </div>
</section>

<style>
  pre {
    tab-size: 4;
    display: flex;
    flex-direction: column;
    position: relative;
    max-height: 60vh;
  }

  code {
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 100%;
    box-sizing: border-box;
  }

  header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  h1 {
    font-size: 24px;
  }

  .post-photo {
    width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }

  iconify-icon {
    font-size: 20px;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    overflow: auto;
    padding: 4px;
  }

  .account {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    text-decoration: none;
  }

  .interactions {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  .interactions iconify-icon {
    font-size: 24px;
  }

  .liked {
    color: var(--accent-color);
  }

  img {
    width: 500px;
    height: 500px;
    border-radius: 100px;
    object-fit: cover;
  }

    /* Style for profile picture only */
  .account img {
    max-width: 50px;  /* Limit the maximum width of the profile picture */
    max-height: 50px; /* Limit the maximum height of the profile picture */
    width: 100%;       /* Ensure the image scales responsively */
    height: 100%;      /* Maintain aspect ratio */
    border-radius: 50%; /* Keep the profile image rounded */
    object-fit: cover; /* Ensure the image covers the area */
  }


  .account iconify-icon {
    font-size: 32px;
  }

  .tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .tag {
    padding: 5px 10px;
    background-color: var(--secondary-color);
    font-size: 14px;
    border-radius: 8px;
  }

  .tag::before {
    content: "#";
    color: var(--accent-color);
  }
</style>
