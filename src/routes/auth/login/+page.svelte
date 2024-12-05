<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  let email = form?.email ?? "";
  let password = form?.password ?? "";

  $: error = form?.message;

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    // You can add PocketBase login logic here
  };
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<!--login page template-->
<div class="flex justify-between items-center min-h-screen bg-bg-shapeshift-grey">
  <!-- Left Column for Title and Slogan -->
  <div class="flex flex-col ml-40 mb-20 justify-center items-center max-w-xl">
    <h1 class="text-6xl font-bold">ShapeShift</h1>
    <div class="text-left ml-0"> 
      <p class="text-xl mt-4 italic"> Where fitness fuels community. Shape your goals, Shift your life. </p>
      <p class="text-xl ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</p>
    </div>
  </div>

  <!-- Right Column for Login Box -->
  <form 
    method="post"
    use:enhance={() => {
      return async ({ update }) => {
        await update({ reset: false, invalidateAll: true });
      };
    }}
    class="flex flex-col bg-white p-6 rounded-lg shadow-md w-96 h-auto border border-gray-300 mx-8"
  >
    <!-- Email Field -->
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

    <!-- Password Field -->
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

    <!-- Error Message -->
    {#if error}
      <p class="error mt-2 text-red-500">{error}</p>
    {/if}

    <!-- Login Button -->
    <button 
      type="submit" 
      class="bg-shape-shift-green text-white p-2 border border-black rounded-md mt-4 hover:bg-shapeshift-dark-pastel-green"
    >
      Login
    </button>

    <!-- Forgot Password button -->
    <button class="text-sm text-center mt-4 underline">Forgot Password?</button>

    <!-- Black Line with Centered Text -->
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
  .bg-shapeshift-light-green {
    background-color: #c9f2c7;
  }

  .bg-shape-shift-green {
    background-color: #228B22;
  }

  .bg-shapeshift-dark-pastel-green {
    background-color: #66bb6a;
  }

  .bg-shapeshift-light-blue {
    background-color: #1E90FF;
  }

  .bg-shapeshift-dark-blue {
    background-color: #0c3d8c;
  }

  .text-black {
    color: #000;
  }

  .text-white {
    color: #fff;
  }

  .text-gray-700 {
    color: #4a4a4a;
  }

  .text-shapeshift-dark-blue {
    color: #0c3d8c;
  }

  .error {
    color: #e53e3e;
    font-size: 12px;
  }
</style>
