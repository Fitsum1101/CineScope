// Simple fetch for popular movies
async function fetchPopularMovies() {
  const apiKey = "8fd7da46674eb421b7ed2fadd60f0ab0"; // Replace with your TMDB API key
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=8fd7da46674eb421b7ed2fadd60f0ab0`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Popular movies:", data.results);
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// Call the function
fetchPopularMovies();
