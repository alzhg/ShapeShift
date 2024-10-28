<script lang="ts">
  import { enhance } from "$app/forms";
  let name = "";
  let email = "";
  let password = "";
  let error = "";
  
  // Optional: Log values for debugging
  const handleCreateAccount = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };
</script>

<svelte:head>
  <title>Create Account</title>
</svelte:head>

<!-- Create Account Page Template -->
<div class="flex justify-between items-center min-h-screen">
  <!-- Left Column for Title and Slogan -->
  <div class="flex flex-col ml-40 mb-20 justify-center items-center max-w-xl">
    <h1 class="text-6xl font-bold text-black">ShapeShift</h1>
    <div class="text-left ml-0"> 
      <p class="text-xl mt-4 italic text-black">Where fitness fuels community. Shape your goals, Shift your life.</p>
      <p class="text-xl text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
  </div>

  <!-- Right Column for Create Account Box -->
  <form 
    method="post"
    use:enhance={() => {
      return async ({ update }) => {
        await update({ reset: false, invalidateAll: true });
      };
    }}
    class="flex flex-col bg-white p-6 rounded-lg shadow-md w-96 h-auto border border-gray-300 mx-8"
  >
    <!-- Name Field -->
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

    <!-- Email Field -->
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

    <!-- Password Field -->
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

    <!-- Error Message -->
    {#if error}
      <p class="error mt-2 text-red-500">{error}</p>
    {/if}

    <!-- Create Account Button -->
    <button 
      type="submit" 
      class="bg-shape-shift-green text-white p-2 border border-black rounded-md mt-4 hover:bg-shapeshift-dark-pastel-green"
      disabled={name.length === 0 || email.length === 0 || password.length < 8}
      on:click={handleCreateAccount}
    >
      Finish Creating Your Account!
    </button>

    <!-- Link to Login Page -->
    <div class="relative my-4 flex items-center">
      <hr class="flex-grow border-t border-black">
      <span class="mx-2 text-black">or</span>
      <hr class="flex-grow border-t border-black">
    </div>

    <!-- Login Button -->
    <div class="flex justify-center mt-4">
      <a href="/auth/login">
        <button type="button" class="bg-shapeshift-light-blue rounded-md p-2 border border-black">Log In</button>
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

  .text-black {
    color: #000;
  }

  .error {
    color: #e53e3e;
    font-size: 12px;
  }
</style>
