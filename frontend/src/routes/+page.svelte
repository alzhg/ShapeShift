<script>
  let email = '';
  let password = '';

  const handleLogin = () => {
    // Add login logic here 
    console.log("Email:", email);
    console.log("Password:", password);
  };
</script>



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
<div class="flex flex-col mr-44 bg-white p-6 rounded-lg shadow-md w-96 h-auto">
  <!-- Email Field -->
  <div class="flex flex-col shadow-sm border border-black rounded-md">
    <input type="email" id="email" bind:value={email} placeholder="Username" required class="bg-shapeshift-field-light-green rounded-md h-10 px-2"/>
  </div>
  
  <!-- Password Field -->
  <div class="flex flex-col shadow-sm mt-4 border border-black rounded-md">
    <input type="password" id="password" bind:value={password} placeholder="Password" required class="bg-shapeshift-field-light-green rounded-md h-10 px-2"/>
  </div>

  <!-- Login Button -->
  <button class="bg-shapeshift-green p-2 border border-black rounded-md mt-4 hover:bg-shapeshift-login-hover">Login</button>

  <!-- Forgot Password button -->
  <button class="text-sm text-center mt-4 underline">Forgot Password?</button>

  <!-- Black Line with Centered 'or' Text -->
  <div class="relative my-4 flex items-center">
    <hr class="flex-grow border-t border-black">
    <span class="mx-2 text-black">or</span>
    <hr class="flex-grow border-t border-black">
  </div>

  <!-- Create Account Button -->
  <button class="bg-shapeshift-light-blue rounded-md mt-4 p-2 border border-black hover:bg-shapeshift-create-acc-hover">Create Account</button>
</div>
</div>