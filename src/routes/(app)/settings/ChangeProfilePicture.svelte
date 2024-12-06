<script lang="ts">
  import type { User } from "$lib/types";
  import { createEventDispatcher, getContext } from "svelte";
  import { authModelKey } from "./+page.svelte";
  import Button from "$lib/components/Button.svelte";
  import { fade } from "svelte/transition";
  import { enhance } from "$app/forms";

  let authModel = getContext<User>(authModelKey); // Get the authenticated user model from context

  let dispatchEvent = createEventDispatcher<{
    close: undefined;
  }>(); // Dispatch events to close the profile picture modal

  let fileList: FileList | undefined; // To hold selected file list for photo upload
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
on:click={() => dispatchEvent("close")}
transition:fade={{ duration: 100 }}
>
<section on:click|stopPropagation> <!-- Prevent clicks inside the section from closing the modal -->
  <header>
    <h1>Change your profile picture</h1>

    <Button
      variant="ghost"
      size="icon"
      on:click={() => dispatchEvent("close")}
    >
      <iconify-icon icon="iconamoon:close"></iconify-icon> <!-- Close icon -->
    </Button>
  </header>

  <form
    action="/settings?/changeProfilePhoto"
    method="post"
    enctype="multipart/form-data"
  >
    <label for="photo" class:hide={fileList}> <!-- Hide label if no file is selected -->
      <span>Upload photo</span>

      <input
        type="file"
        name="photo"
        id="photo"
        accept="image/png, image/jpg, image/gif, image/svg"
        bind:files={fileList}
      />
    </label>

    {#if fileList} <!-- Show buttons if a file is selected -->
      <Button variant="primary">Confirm</Button> <!-- Confirm button to upload the selected photo -->

      <Button
        on:click={(e) => {
          e.preventDefault(); // Prevent the default form submission behavior
          dispatchEvent("close"); // Close the modal when cancel button is clicked
        }}
      >
        Cancel
      </Button> <!-- Cancel button to close the modal without uploading -->
    {/if}
  </form>

  {#if authModel.photo && !fileList} <!-- Show remove photo option if there's an existing photo and no file selected -->
    <form action="/settings?/removeProfilePhoto" method="post">
      <Button>Remove current photo</Button> <!-- Button to remove the current profile photo -->
    </form>
  {/if}
</section>
</div>

<style>
  div {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    place-items: center; /* Centers the modal on the screen */
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black background */
  }

  section {
    padding: 1rem;
    border: solid 1px var(--tertiary-color);
    background-color: var(--primary-color);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  header {
    display: flex;
    justify-content: space-between; /* Space out the title and close button */
    align-items: center;
    gap: 2rem;
  }

  h1 {
    font-size: 16px;
  }

  iconify-icon {
    font-size: 24px; /* Set the size of the close icon */
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    text-align: center;
    font-size: 12px;
    padding: 5px;
    border: solid 1px var(--tertiary-color);
    border-radius: 4px;
    transition: all 150ms ease-in-out;
  }

  label:hover {
    background-color: var(--secondary-color); /* Change background color on hover */
  }

  .hide {
    display: none; /* Hide the label when no file is selected */
  }

  input {
    display: none; /* Hide the file input */
  }
</style>
