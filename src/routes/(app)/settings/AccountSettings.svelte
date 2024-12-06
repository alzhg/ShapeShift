<script lang="ts">
  // Importing necessary components and types
  import Button from "$lib/components/Button.svelte";
  import type { User } from "$lib/types";
  import { getContext } from "svelte";
  import { authModelKey } from "./+page.svelte";

  // Retrieving the authentication model from context, which contains user info
  let authModel = getContext<User>(authModelKey);

  // Set the initial bio value from the authentication model, default to an empty string
  let bio = authModel?.bio ?? "";
</script>

<section class="account-settings">
  <!-- Main heading for the account settings section -->
  <h1>Account Settings</h1>

  <hr />

  <!-- Form to update the user's name -->
  <form action="/settings?/changeName" method="post">
    <h2>Name</h2>

    <div class="form-inputs">
      <!-- Input field for the name, bound to the current value in the authModel -->
      <input type="text" name="name" value={authModel.name} />

      <!-- Button to submit the form for updating the name -->
      <Button>Update Name</Button>
    </div>
  </form>

  <!-- Form to update the user's email preferences -->
  <form action="/settings?/changeEmail" method="post">
    <h2>Email Preference</h2>

    <div class="form-inputs">
      <!-- Input field for email, pre-filled with the user's current email -->
      <input type="email" name="email" value={authModel.email} />

      <!-- Button to submit the form for updating the email -->
      <Button>Update Email</Button>
    </div>
  </form>

  <!-- Form to update the user's bio -->
  <form class="bio" action="/settings?/changeBio" method="post">
    <h2>Bio</h2>

    <div class="form-inputs">
      <label for="bio">
        <!-- Input field for the bio, bound to the bio variable and limited to 150 characters -->
        <input
          type="text"
          name="bio"
          id="bio"
          bind:value={bio}
          on:input={(e) => {
            // Limit the bio input to 150 characters
            if (e.currentTarget.value.length > 150) {
              bio = bio.slice(0, 150);
            }
          }}
          placeholder="Enter a valid bio"
        />

        <!-- Displaying the current bio length out of 150 characters -->
        <p>{bio.length}/150</p>
      </label>

      <div>
        <!-- Button to submit the form for updating the bio -->
        <Button>Update bio</Button>
      </div>
    </div>
  </form>
</section>

<style>
  /* Styling for the main heading of the section */
  h1 {
    font-size: 24px;
  }

  /* Styling for sub-headings inside each form */
  h2 {
    font-size: 18px;
  }

  /* Styling for the horizontal rule separating sections */
  hr {
    border: none;
    border-top: solid 1px var(--tertiary-color);
  }

  /* Styling for the overall account settings section */
  section {
    flex-grow: 1;
    background-color: var(--primary-color);
    padding: 1rem;
    border: solid 1px var(--tertiary-color);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Styling for each form inside the section */
  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* Styling for input fields */
  input {
    background-color: var(--secondary-color);
    border: solid 1px var(--tertiary-color);
    border-radius: 4px;
    padding: 6px;
    font-size: 12px;
  }

  /* Styling for the input container, allowing for responsive layouts */
  .form-inputs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  /* Styling specific to the bio section for better layout */
  form.bio .form-inputs {
    flex-direction: column;
  }

  /* Custom styling for the bio input, making it appear integrated within the label */
  form.bio input {
    flex: 1;
    background-color: transparent;
    border: none;
    border-radius: 0;
    padding: 0;
    outline: none;
  }

  /* Label styling for the bio input field, making it a visually distinct block */
  form.bio label {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    background-color: var(--secondary-color);
    border: solid 1px var(--tertiary-color);
    border-radius: 4px;
    padding: 6px;
    font-size: 12px;
  }

  /* Styling for the bio character count */
  form.bio p {
    font-size: 11px;
    opacity: 0.7;
    font-weight: 500;
    text-align: end;
  }

  /* Visual enhancement when the bio input is focused */
  form.bio label:has(input:focus) {
    outline: solid 2px var(--complementary-color);
  }
</style>
