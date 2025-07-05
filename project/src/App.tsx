import React, { useState, useEffect } from 'react';
import { Movie } from './types/movie';
import { omdbApi } from './services/omdbApi';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import MovieGrid from './components/MovieGrid';
import MovieModal from './components/MovieModal';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setIsInitialLoading(true);
    try {
      const popularMovies = await omdbApi.getPopularMovies();
      setMovies(popularMovies);
    } catch (error) {
      console.error('Error loading popular movies:', error);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    try {
      const response = await omdbApi.searchMovies(query);
      if (response.Response === 'True') {
        setMovies(response.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieClick = async (movie: Movie) => {
    try {
      const detailedMovie = await omdbApi.getMovieDetails(movie.imdbID);
      if (detailedMovie.Response === 'True') {
        setSelectedMovie(detailedMovie);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header onSearch={handleSearch} isSearching={isLoading} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? 'Click on any movie to see more details' : 'Discover amazing movies and get detailed information'}
            </p>
          </div>

          <MovieGrid
            movies={movies}
            onMovieClick={handleMovieClick}
            isLoading={isLoading || isInitialLoading}
          />
        </main>

        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;