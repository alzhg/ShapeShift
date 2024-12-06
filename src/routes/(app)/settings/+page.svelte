<script context="module">
  // Defining the key for accessing the authentication model in context
  export const authModelKey = { name: "authModel" };
</script>

<script lang="ts">
  // Importing necessary components and types
  import AccountSettings from "./AccountSettings.svelte";
  import type { PageData } from "./$types";
  import Profile from "./Profile.svelte";
  import Security from "./Security.svelte";
  import { setContext } from "svelte";

  // Receiving the data from the page load
  export let data: PageData;

  // Setting the authentication model in the Svelte context so it can be accessed by child components
  setContext(authModelKey, data.authModel);
</script>

<svelte:head>
  <!-- Setting the title of the page for SEO and user navigation -->
  <title>Settings - CS</title>
</svelte:head>

<article>
  <!-- Including the AccountSettings component, which handles general account settings -->
  <AccountSettings />

  <!-- The "right" div will contain the Profile and Security components -->
  <div class="right">
    <!-- Profile component for displaying and modifying user profile information -->
    <Profile />

    <!-- Security component for handling user security settings like password, 2FA, etc. -->
    <Security />
  </div>
</article>

<style>
  /* Styling for the article to be displayed in a column with some spacing */
  article {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  /* Right side section styling to display Profile and Security in a column */
  .right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* Responsive styling for larger screens: article will switch to a row layout */
  @media (min-width: 700px) {
    article {
      flex-direction: row;
    }

    /* The right section will have a minimum width on larger screens */
    .right {
      min-width: 20rem;
    }
  }
</style>
