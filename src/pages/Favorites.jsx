import { useState, useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { FaTrash } from "react-icons/fa";
import "../css/Favorites.css";

function Favorites() {
  const { getAllFavorites, clearAllFavorites } = useMovieContext();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from context
  useEffect(() => {
    setFavorites(getAllFavorites());
  }, [getAllFavorites]);

  const handleClearAllClick = () => {
    setShowConfirmation(true);
  };

  const confirmClearAll = () => {
    clearAllFavorites();
    setFavorites([]);
    setShowConfirmation(false);
  };

  const cancelClearAll = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>Your Favorite Movies</h1>
        {favorites.length > 0 && (
          <button
            className="clear-favorites-btn"
            onClick={handleClearAllClick}
            aria-label="Clear all favorites"
          >
            <FaTrash /> Clear All
          </button>
        )}
      </div>

      {showConfirmation && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <h3>Remove all favorites?</h3>
            <p>This action cannot be undone.</p>
            <div className="confirmation-actions">
              <button className="confirm-btn" onClick={confirmClearAll}>
                Yes, clear all
              </button>
              <button className="cancel-btn" onClick={cancelClearAll}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="no-favorites">
          <div className="no-favorites-icon">🎬</div>
          <h2>Your favorites list is empty</h2>
          <p>Start adding movies to your favorites to see them here!</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie, index) => (
            <div
              key={movie.id}
              className="favorite-item animate-fadeUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
