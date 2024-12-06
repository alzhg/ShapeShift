<main>
  <article>
    <slot />
  </article>
</main>

<style>
  main {
    height: 100vh;
    width: 100vw; /* Full viewport width */
    display: flex; /* Flexbox for layout control */
    padding: 0; /* Remove any padding */
    margin: 0; /* Remove any margin */
  }

  article {
    width: 100%; /* Article takes full width */
    height: 100%; /* EArticle takes full height */
    display: flex;
    justify-content: center; /* Center content inside the article */
    align-items: center; /* Center content vertically */
  }

</style>
