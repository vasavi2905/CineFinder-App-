const API_KEY = '7e021dc0';
const BASE_URL = 'https://www.omdbapi.com/';

export const omdbApi = {
  searchMovies: async (query: string, page: number = 1) => {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`);
    return response.json();
  },

  getMovieDetails: async (imdbID: string) => {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
    return response.json();
  },

  getPopularMovies: async () => {
    // Since OMDb doesn't have a "popular" endpoint, we'll search for some popular movies
    const popularTitles = ['The Shawshank Redemption', 'The Godfather', 'The Dark Knight', 'Pulp Fiction', 'Forrest Gump', 'Inception'];
    const movies = [];
    
    for (const title of popularTitles) {
      try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}`);
        const movie = await response.json();
        if (movie.Response === 'True') {
          movies.push(movie);
        }
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      }
    }
    
    return movies;
  }
};