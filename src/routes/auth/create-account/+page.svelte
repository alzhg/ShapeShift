<script lang="ts">
  import { enhance } from "$app/forms";

  // Local state variables for form inputs and error messages
  let name = "";
  let email = "";
  let password = "";
  let error = "";
  
  // Optional function to log form values for debugging purposes
  const handleCreateAccount = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };
</script>

<svelte:head>
  <!-- Set the page title -->
  <title>Create Account</title>
</svelte:head>

<!-- Main Layout for the Create Account Page -->
<div class="flex justify-between items-center min-h-screen">
  <!-- Left Column: Branding and Slogan -->
  <div class="flex flex-col ml-40 mb-20 justify-center items-center max-w-xl">
    <h1 class="text-6xl font-bold text-black">ShapeShift</h1>
    <div class="text-left ml-0">
      <p class="text-xl mt-4 italic text-black">Where fitness fuels community. Shape your goals, Shift your life.</p>
      <!-- Placeholder description text -->
      <p class="text-xl text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
  </div>

  <!-- Right Column: Create Account Form -->
  <form 
    method="post"
    use:enhance={() => {
      // Use SvelteKit's enhance function to handle progressive enhancement of forms
      return async ({ update }) => {
        // Prevent the form from resetting or losing state on submission
        await update({ reset: false, invalidateAll: true });
      };
    }}
    class="flex flex-col bg-white p-6 rounded-lg shadow-md w-96 h-auto border border-gray-300 mx-8"
  >
    <!-- Name Input Field -->
    <div class="flex flex-col shadow-sm border border-black rounded-md">
      <input 
        type="text" 
        name="name"
        bind:value={name} 
        placeholder="Enter your name" 
        required 
        class="bg-shapeshift-light-green rounded-md h-10 px-2 text-black"
      />
    </div>

    <!-- Email Input Field -->
    <div class="flex flex-col shadow-sm mt-4 border border-black rounded-md">
      <input 
        type="email" 
        name="email"
        bind:value={email} 
        placeholder="Enter your e-mail" 
        required 
        class="bg-shapeshift-light-green rounded-md h-10 px-2 text-black"
      />
    </div>

    <!-- Password Input Field -->
    <div class="flex flex-col shadow-sm mt-4 border border-black rounded-md">
      <input 
        type="password" 
        name="password"
        bind:value={password} 
        placeholder="Enter your password" 
        required 
        class="bg-shapeshift-light-green rounded-md h-10 px-2 text-black"
      />
    </div>

    <!-- Error Message Display -->
    {#if error}
      <!-- Show an error message if there's an issue with form submission -->
      <p class="error mt-2 text-red-500">{error}</p>
    {/if}

    <!-- Submit Button for Account Creation -->
    <button 
      type="submit" 
      class="bg-shape-shift-green text-white p-2 border border-black rounded-md mt-4 hover:bg-shapeshift-dark-pastel-green"
      disabled={name.length === 0 || email.length === 0 || password.length < 8}
      on:click={handleCreateAccount} 
    >
      Finish Creating Your Account!
    </button>

    <!-- Divider for alternative login option -->
    <div class="relative my-4 flex items-center">
      <hr class="flex-grow border-t border-black">
      <span class="mx-2 text-black">or</span>
      <hr class="flex-grow border-t border-black">
    </div>

    <!-- Button to navigate to the login page -->
    <div class="flex justify-center mt-4">
      <a href="/auth/login">
        <button type="button" class="bg-shapeshift-light-blue rounded-md p-2 border border-black">Log In</button>
      </a>
    </div>
  </form>
</div>

<style>
  /* Custom color for light green backgrounds */
  .bg-shapeshift-light-green {
    background-color: #c9f2c7;
  }

  /* Custom color for the primary green button */
  .bg-shape-shift-green {
    background-color: #228B22;
  }

  /* Hover state color for the primary green button */
  .bg-shapeshift-dark-pastel-green {
    background-color: #66bb6a;
  }

  /* Custom color for the login button */
  .bg-shapeshift-light-blue {
    background-color: #1E90FF;
  }

  /* Ensure consistent black text across the app */
  .text-black {
    color: #000;
  }

  /* Styling for error messages */
  .error {
    color: #e53e3e;
    font-size: 12px;
  }
</style>
