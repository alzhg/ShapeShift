<script lang="ts">
  import Button from "$lib/components/Button.svelte"; // Import Button component for use in the profile section
  import { pb } from "$lib/pocketbase"; // Import PocketBase instance for file handling
  import type { User } from "$lib/types"; // Import User type to ensure type safety for authModel
  import { getContext } from "svelte"; // Import getContext for accessing context values
  import ChangeProfilePicture from "./ChangeProfilePicture.svelte"; // Import the ChangeProfilePicture component for modal
  import { authModelKey } from "./+page.svelte"; // Import the key for accessing authentication context

  let authModel = getContext<User>(authModelKey); // Access the current user context, which contains user info

  let showChangeProfilePicture = false; // Boolean flag to toggle showing the profile picture change modal
</script>

{#if $pb} <!-- Only render the profile section if the PocketBase instance is available -->
<section>
  <h1>Profile</h1> <!-- Title of the profile section -->

  <div class="profile">
    <div class="profile-content">
      {#if authModel.photo} <!-- If the user has a profile picture, display it -->
        <img
          src={$pb.getFileUrl(authModel, authModel.photo)} 
          alt={authModel.name} 
        />
      {:else} <!-- If no profile picture exists, display a default icon -->
        <iconify-icon icon="mingcute:user-4-fill"></iconify-icon>
      {/if}

      <span class="name">{authModel.name}</span> <!-- Display the user's name -->
    </div>

    <div class="profile-actions">
      <Button
        variant="ghost" 
        on:click={(e) => { 
          showChangeProfilePicture = true; // Show the change profile picture modal when the button is clicked
          e.stopPropagation(); // Prevent click event from bubbling up to parent elements
        }}
      >
        Change Profile Picture <!-- Button text to trigger profile picture change -->
      </Button>
    </div>
  </div>
</section>

{#if showChangeProfilePicture} <!-- If the flag is true, show the profile picture change modal -->
  <ChangeProfilePicture on:close={() => (showChangeProfilePicture = false)} /> <!-- Pass the close event handler to reset the flag -->
{/if}
{/if}

<style>
h1 {
  font-size: 24px; /* Set the font size for the profile section header */
}

section {
  background-color: var(--primary-color); /* Set background color for the section */
  padding: 1rem; /* Add padding around the section */
  border: solid 1px var(--tertiary-color); /* Border styling for the section */
  border-radius: 8px; /* Rounded corners for the section */
  display: flex;
  flex-direction: column;
  gap: 16px; /* Space out child elements within the section */
}

.profile {
  border: solid 1px var(--tertiary-color); /* Border around the profile area */
  border-radius: 8px; /* Rounded corners for the profile section */
  display: flex;
  gap: 2rem; /* Space between the profile content and actions */
  justify-content: space-between; /* Align profile content and actions at opposite ends */
  align-items: center;
  padding: 8px; /* Padding inside the profile section */
}

.profile-content {
  display: flex;
  gap: 8px; /* Space between the profile image and name */
  align-items: center; /* Align the image and name vertically */
}

img {
  width: 28px; /* Set width of the profile image */
  height: 28px; /* Set height of the profile image */
  border-radius: 100px; /* Make the profile image circular */
  object-fit: cover; /* Ensure the image covers the circle without distortion */
}

iconify-icon {
  font-size: 28px; /* Set the size of the default icon */
}

.name {
  font-weight: bold; /* Make the user's name bold */
  font-size: 14px; /* Set the font size for the name */
}
</style>
