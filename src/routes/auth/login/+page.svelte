<script lang="ts">
  import { enhance } from "$app/forms"; // Import enhance for form handling in SvelteKit
  import type { ActionData } from "./$types"; // Import the type for form data

  export let form: ActionData; // Form data received from the server

  // Bind the email and password fields to form data if available, otherwise default to empty strings
  let email = form?.email ?? "";
  let password = form?.password ?? "";

  // Automatically update the error message when form.message changes
  $: error = form?.message;

  // Example login handler for debugging or extension purposes
  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    // Placeholder for additional PocketBase login logic
  };
</script>

<svelte:head>
  <title>Login</title> <!-- Set the page title -->
</svelte:head>

<!-- Login page layout -->
<div class="flex justify-between items-center min-h-screen bg-bg-shapeshift-grey">
  <!-- Left Column: Title and Slogan -->
  <div class="flex flex-col ml-40 mb-20 justify-center items-center max-w-xl">
    <h1 class="text-6xl font-bold">ShapeShift</h1>
    <div class="text-left ml-0">
      <p class="text-xl mt-4 italic">
        Where fitness fuels community. Shape your goals, Shift your life.
      </p>
      <p class="text-xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.
      </p>
    </div>
  </div>

  <!-- Right Column: Login Form -->
  <form
    method="post"
    use:enhance={() => {
      return async ({ update }) => {
        // Update the form state without resetting or invalidating fields
        await update({ reset: false, invalidateAll: true });
      };
    }}
    class="flex flex-col bg-white p-6 rounded-lg shadow-md w-96 h-auto border border-gray-300 mx-8"
  >
    <!-- Email Input Field -->
    <div class="flex flex-col shadow-sm border border-black rounded-md">
      <input
        type="email"
        id="email"
        name="email"
        bind:value={email}
        placeholder="Email"
        required
        class="bg-shapeshift-light-green rounded-md h-10 px-2 text-black"
      />
    </div>

    <!-- Password Input Field -->
    <div class="flex flex-col shadow-sm mt-4 border border-black rounded-md">
      <input
        type="password"
        id="password"
        name="password"
        bind:value={password}
        placeholder="Password"
        required
        class="bg-shapeshift-light-green rounded-md h-10 px-2 text-black"
      />
    </div>

    <!-- Error Message Display -->
    {#if error}
      <p class="error mt-2 text-red-500">{error}</p> <!-- Show error if one exists -->
    {/if}

    <!-- Login Button -->
    <button
      type="submit"
      class="bg-shape-shift-green text-white p-2 border border-black rounded-md mt-4 hover:bg-shapeshift-dark-pastel-green"
    >
      Login
    </button>

    <!-- Forgot Password Button -->
    <button class="text-sm text-center mt-4 underline">Forgot Password?</button>

    <!-- Divider with 'or' -->
    <div class="relative my-4 flex items-center">
      <hr class="flex-grow border-t border-black">
      <span class="mx-2 text-black">or</span>
      <hr class="flex-grow border-t border-black">
    </div>

    <!-- Create Account Button -->
    <div class="flex justify-center mt-4">
      <a href="/auth/create-account">
        <button type="button" class="bg-shapeshift-light-blue rounded-md p-2 border border-black">Create Account</button>
      </a>
    </div>
  </form>
</div>

<style>
  /* Custom light green background for input fields */
  .bg-shapeshift-light-green {
    background-color: #c9f2c7;
  }

  /* Primary green button background */
  .bg-shape-shift-green {
    background-color: #228B22;
  }

  /* Hover effect for login button */
  .bg-shapeshift-dark-pastel-green {
    background-color: #66bb6a;
  }

  /* Light blue background for the create account button */
  .bg-shapeshift-light-blue {
    background-color: #1E90FF;
  }

  /* General text colors */
  .text-black {
    color: #000;
  }
  .text-white {
    color: #fff;
  }

  /* Error message styling */
  .error {
    color: #e53e3e; /* Red text for errors */
    font-size: 12px; /* Slightly smaller text for emphasis */
  }
</style>
