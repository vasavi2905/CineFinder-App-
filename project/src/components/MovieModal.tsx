import React, { useState } from 'react';
import { X, Star, Calendar, Clock, Globe, Award, Play, ExternalLink } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/300x450/374151/ffffff?text=No+Image';
  };

  const getTrailerUrl = () => {
    // Create a search query for YouTube trailer
    const searchQuery = `${movie.Title} ${movie.Year} official trailer`;
    return `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(searchQuery)}&autoplay=1`;
  };

  const getIMDbUrl = () => {
    return `https://www.imdb.com/title/${movie.imdbID}`;
  };

  const handleTrailerClick = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  if (showTrailer) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
        <div className="relative w-full max-w-6xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-xl font-semibold">
              {movie.Title} ({movie.Year}) - Trailer
            </h3>
            <button
              onClick={handleCloseTrailer}
              className="text-white hover:text-gray-300 transition-colors duration-200 p-2"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={getTrailerUrl()}
              title={`${movie.Title} Trailer`}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={handleCloseTrailer}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Close Trailer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 p-6">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450/374151/ffffff?text=No+Image'}
                alt={movie.Title}
                onError={handleImageError}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <div className="md:w-2/3 p-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {movie.Title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">{movie.Year}</span>
                </div>
                
                {movie.Runtime && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{movie.Runtime}</span>
                  </div>
                )}

                {movie.imdbRating && (
                  <div className="flex items-center space-x-2 bg-yellow-500 text-black px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">{movie.imdbRating}</span>
                  </div>
                )}
              </div>

              {movie.Genre && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.Genre.split(', ').map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleTrailerClick}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-semibold"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Trailer</span>
                </button>
                
                <a
                  href={getIMDbUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-semibold"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View on IMDb</span>
                </a>
              </div>

              {movie.Plot && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Plot</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {movie.Plot}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {movie.Director && (
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Director:</span>
                    <p className="text-gray-700 dark:text-gray-300">{movie.Director}</p>
                  </div>
                )}

                {movie.Actors && (
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Cast:</span>
                    <p className="text-gray-700 dark:text-gray-300">{movie.Actors}</p>
                  </div>
                )}

                {movie.Writer && (
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Writer:</span>
                    <p className="text-gray-700 dark:text-gray-300">{movie.Writer}</p>
                  </div>
                )}

                {movie.Language && (
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Language:</span>
                    <p className="text-gray-700 dark:text-gray-300">{movie.Language}</p>
                  </div>
                )}

                {movie.Country && (
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Country:</span>
                    <p className="text-gray-700 dark:text-gray-300">{movie.Country}</p>
                  </div>
                )}

                {movie.Awards && movie.Awards !== 'N/A' && (
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Awards:</span>
                    <p className="text-gray-700 dark:text-gray-300">{movie.Awards}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;