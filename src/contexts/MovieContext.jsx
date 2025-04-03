import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export function useMovieContext() {
  return useContext(MovieContext);
}

export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("movieFavorites");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (e) {
      console.error("Error loading favorites from localStorage:", e);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("movieFavorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Error saving favorites to localStorage:", e);
    }
  }, [favorites]);

  // Add a movie to favorites
  function addToFavorites(movie) {
    setFavorites((prevFavorites) => {
      // Check if movie is already in favorites to avoid duplicates
      if (!prevFavorites.some((fav) => fav.id === movie.id)) {
        return [...prevFavorites, movie];
      }
      return prevFavorites;
    });
  }

  // Remove a movie from favorites
  function removeFromFavorites(movieId) {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== movieId)
    );
  }

  // Check if a movie is in favorites
  function isFavorite(movieId) {
    return favorites.some((movie) => movie.id === movieId);
  }

  // Clear all favorites
  function clearAllFavorites() {
    setFavorites([]);
    localStorage.removeItem("movieFavorites");
  }

  // Get all favorites
  function getAllFavorites() {
    return favorites;
  }

  const value = {
    favorites,
    loading,
    error,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearAllFavorites,
    getAllFavorites,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}
