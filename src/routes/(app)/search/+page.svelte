<script>
    import { searchArticles } from '$lib/api';
  
    let query = '';
    let results = [];
    let loading = false;
    let error = null;
  
    async function performSearch() {
      loading = true;
      error = null;
  
      try {
        results = await searchArticles(query);
      } catch (err) {
        error = err.message;
      } finally {
        loading = false;
      }
    }
</script>
  
<div class="search-container">
    <input
      type="text"
      bind:value={query}
      placeholder="Search for scholarly articles..."
      on:keydown={(e) => e.key === 'Enter' && performSearch()}
    />
    <button on:click={performSearch}>Search</button>
</div>
  
{#if loading}
  <p class="centered">Loading...</p>
{:else if error}
  <p>Error: {error}</p>
{:else if results.length > 0}
  <div class="results-container">
    <ul>
      {#each results as article}
        <li>
          <h2>{article.title ? article.title[0] : 'No title available'}</h2>
          <p>Author: {article.author?.[0]?.given} {article.author?.[0]?.family || ''}</p>
          <p>Published: {article.created['date-time']}</p>
          <a href={article.URL} target="_blank">View Article</a>
        </li>
      {/each}
    </ul>
  </div>
{:else}
  <p class="centered">No results found.</p>
{/if}
  
<style>
    /* Center and style the search container */
    .search-container {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .search-container input {
        width: 300px; /* Make the input larger */
        padding: 0.75rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
    }

    .search-container button {
        padding: 0.75rem 1rem;
        font-size: 1rem;
        background-color: #0b6824;
        color: white;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
    }

    .search-container button:hover {
        background-color: #246a1b;
    }

    /* Center and style the "Loading..." and "No results" messages */
    .centered {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px; /* Adjust as needed */
        text-align: center;
        font-size: 1.25rem;
        color: #555;
    }

    /* Style and center the results container */
    .results-container {
        max-width: 600px; /* Limit the width of the results */
        margin: 0 auto; /* Center the results */
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        background-color: #f9f9f9;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        margin-bottom: 1rem;
        border-bottom: 1px solid #ccc;
        padding-bottom: 1rem;
    }

    li h2 {
        font-size: 1.25rem;
        margin: 0;
    }

    li p {
        margin: 0.25rem 0;
    }

    li a {
        color: #0f5625;
        text-decoration: none;
    }

    li a:hover {
        text-decoration: underline;
    }
</style>
