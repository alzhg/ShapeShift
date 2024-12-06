<script>
  import { searchArticles } from '$lib/api'; // Importing the searchArticles function from the API module

  let query = ''; // Stores the search query entered by the user
  let results = []; // Stores the search results
  let loading = false; // Indicates whether the search is in progress
  let error = null; // Holds any error message in case the search fails

  // Function to perform the search when the user presses enter or clicks the search button
  async function performSearch() {
    loading = true; // Set loading to true while fetching the results
    error = null; // Reset error message when a new search starts

    try {
      // Call the searchArticles function to fetch the search results based on the query
      results = await searchArticles(query);
    } catch (err) {
      // If an error occurs, set the error message
      error = err.message;
    } finally {
      loading = false; // Set loading to false once the search is complete
    }
  }
</script>

<div class="search-container">
  <!-- Search input field with Enter key event handling and value binding -->
  <input
    type="text"
    bind:value={query}
    placeholder="Search for scholarly articles..."
    on:keydown={(e) => e.key === 'Enter' && performSearch()} 
  />
  <!-- Search button to manually trigger the search -->
  <button on:click={performSearch}>Search</button>
</div>

{#if loading}
<!-- Display a loading message while results are being fetched -->
<p class="centered">Loading...</p>
{:else if error}
<!-- If an error occurs, display the error message -->
<p>Error: {error}</p>
{:else if results.length > 0}
<!-- If results are found, display them in a list -->
<div class="results-container">
  <ul>
    {#each results as article}
      <li>
        <!-- Display article details such as title, author, and publication date -->
        <h2>{article.title ? article.title[0] : 'No title available'}</h2>
        <p>Author: {article.author?.[0]?.given} {article.author?.[0]?.family || ''}</p>
        <p>Published: {article.created['date-time']}</p>
        <!-- Link to the article's URL -->
        <a href={article.URL} target="_blank">View Article</a>
      </li>
    {/each}
  </ul>
</div>
{:else}
<!-- If no results are found, display a message -->
<p class="centered">No results found.</p>
{/if}

<style>
  /* Center and style the search container */
  .search-container {
      display: flex;
      justify-content: center; /* Center the search input and button horizontally */
      gap: 0.5rem; /* Add space between the input and button */
      margin-bottom: 1rem;
  }

  .search-container input {
      width: 300px; /* Make the input larger for better user experience */
      padding: 0.75rem; /* Add padding for a larger click area */
      font-size: 1rem;
      border: 1px solid #ccc; /* Light border color */
      border-radius: 0.5rem; /* Rounded corners */
  }

  .search-container button {
      padding: 0.75rem 1rem; /* Add padding to the button */
      font-size: 1rem;
      background-color: #0b6824; /* Green background color */
      color: white;
      border: none;
      border-radius: 0.5rem; /* Rounded corners */
      cursor: pointer; /* Pointer cursor on hover */
  }

  .search-container button:hover {
      background-color: #246a1b; /* Darker green on hover */
  }

  /* Center and style the "Loading..." and "No results" messages */
  .centered {
      display: flex;
      justify-content: center; /* Center the message horizontally */
      align-items: center; /* Center the message vertically */
      height: 200px; /* Adjust height as needed */
      text-align: center;
      font-size: 1.25rem;
      color: #555; /* Dark gray color for text */
  }

  /* Style and center the results container */
  .results-container {
      max-width: 600px; /* Limit the width of the results to 600px */
      margin: 0 auto; /* Center the results container */
      padding: 1rem; /* Add padding inside the container */
      border: 1px solid #ccc; /* Light border color */
      border-radius: 0.5rem; /* Rounded corners */
      background-color: #f9f9f9; /* Light background color */
  }

  ul {
      list-style: none; /* Remove default list styling */
      padding: 0; /* Remove padding */
  }

  li {
      margin-bottom: 1rem; /* Add space between each list item */
      border-bottom: 1px solid #ccc; /* Border between items */
      padding-bottom: 1rem; /* Add padding below each item */
  }

  li h2 {
      font-size: 1.25rem; /* Make the title slightly larger */
      margin: 0; /* Remove default margin */
  }

  li p {
      margin: 0.25rem 0; /* Add space between paragraphs */
  }

  li a {
      color: #0f5625; /* Green color for links */
      text-decoration: none; /* Remove underline */
  }

  li a:hover {
      text-decoration: underline; /* Underline the link on hover */
  }
</style>
