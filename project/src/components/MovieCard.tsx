import React from 'react';
import { Star, Calendar, Clock } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/300x450/374151/ffffff?text=No+Image';
  };

  return (
    <div
      onClick={() => onClick(movie)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450/374151/ffffff?text=No+Image'}
          alt={movie.Title}
          onError={handleImageError}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {movie.imdbRating && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
            <Star className="w-3 h-3 fill-current" />
            <span>{movie.imdbRating}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {movie.Title}
        </h3>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{movie.Year}</span>
          </div>
          
          {movie.Runtime && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{movie.Runtime}</span>
            </div>
          )}
        </div>

        {movie.Genre && (
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.Genre.split(', ').slice(0, 3).map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
        )}

        {movie.Plot && (
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
            {movie.Plot}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;