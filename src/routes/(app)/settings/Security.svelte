<script>
  import { enhance } from "$app/forms"; // Import the enhance function for form handling with enhanced form submissions

  import Button from "$lib/components/Button.svelte"; // Import Button component for form buttons
</script>

<section>
<h1>Security</h1> <!-- Section heading for security settings -->

<hr /> <!-- Horizontal rule to separate sections visually -->

<!-- Log out form -->
<form action="/settings?/logout" method="post" use:enhance> <!-- Form to log out the user -->
  <Button variant="destructive">Log out</Button> <!-- Destructive button style to signify a critical action -->
</form>

<!-- Delete account form -->
<form action="/settings?/deleteAccount" method="post" use:enhance> <!-- Form to delete the user account -->
  <Button>Delete account</Button> <!-- Standard button for account deletion -->
</form>
</section>

<style>
h1 {
  font-size: 24px; /* Set font size for the section title */
}

h2 {
  font-size: 18px; /* Set font size for any subheadings, though it's not used here */
}

hr {
  border: none; /* Remove default border style */
  border-top: solid 1px var(--tertiary-color); /* Add a thin border at the top for visual separation */
}

section {
  flex-shrink: 1; /* Ensure the section doesn't shrink when layout space is tight */
  background-color: var(--primary-color); /* Set the background color to the primary theme color */
  padding: 1rem; /* Add padding around the content */
  border: solid 1px var(--tertiary-color); /* Border around the section */
  border-radius: 8px; /* Rounded corners for a soft, modern look */
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  gap: 16px; /* Space between the form and other elements */
}

form {
  display: flex;
  flex-direction: column; /* Stack form elements vertically */
  gap: 8px; /* Space between each form field or button */
}
</style>
