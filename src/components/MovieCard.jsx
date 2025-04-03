import { useState, useRef, useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { FaStar, FaCalendarAlt } from "react-icons/fa";
import "../css/MovieCard.css";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const [favorite, setFavorite] = useState(isFavorite(movie.id));
  const cardRef = useRef(null);

  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  // Update favorite state when context changes
  useEffect(() => {
    setFavorite(isFavorite(movie.id));
  }, [movie.id, isFavorite]);

  // Handle card parallax effect on mouse move with optimized performance
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let requestId;
    let lastX = 0;
    let lastY = 0;
    let isHovering = false;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();

      // Calculate mouse position relative to card center (normalized from -1 to 1)
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      lastX = x;
      lastY = y;

      if (!requestId && isHovering) {
        requestId = requestAnimationFrame(updateTransform);
      }
    };

    const updateTransform = () => {
      requestId = null;
      // Calculate rotation (limited to small angles)
      const rotateY = lastX * 4; // Subtler effect
      const rotateX = -lastY * 4; // Subtler effect
      const translateZ = 15;

      // Apply subtle parallax transform with GPU acceleration
      card.style.transform = `
        perspective(1000px) 
        rotateY(${rotateY}deg) 
        rotateX(${rotateX}deg)
        translateY(-3px)
        scale(1.02)
        translateZ(${translateZ}px)
      `;

      if (isHovering) {
        requestId = requestAnimationFrame(updateTransform);
      }
    };

    const handleMouseEnter = () => {
      isHovering = true;
      requestId = requestAnimationFrame(updateTransform);
    };

    const handleMouseLeave = () => {
      isHovering = false;
      if (requestId) {
        cancelAnimationFrame(requestId);
        requestId = null;
      }
      // Reset transform with transition
      card.style.transform = "";
    };

    // Only add the event listener on devices with hover capability
    if (window.matchMedia("(hover: hover)").matches) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (window.matchMedia("(hover: hover)").matches) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
        if (requestId) {
          cancelAnimationFrame(requestId);
        }
      }
    };
  }, []);

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();

    // Get the heart element
    const heartElement = e.currentTarget;

    if (favorite) {
      // Remove from favorites with animation
      heartElement.classList.add("heart-pop-out");

      setTimeout(() => {
        removeFromFavorites(movie.id);
        setFavorite(false);

        setTimeout(() => {
          heartElement.classList.remove("heart-pop-out");
        }, 300);
      }, 150);
    } else {
      // Add to favorites with animation
      heartElement.classList.add("heart-pop-in");

      setTimeout(() => {
        addToFavorites(movie);
        setFavorite(true);

        // Add pulse effect after adding to favorites
        setTimeout(() => {
          heartElement.classList.add("heart-pulse");

          // Remove animation classes after animation completes
          setTimeout(() => {
            heartElement.classList.remove("heart-pulse", "heart-pop-in");
          }, 1000);
        }, 200);
      }, 200);
    }
  }

  // Format the release date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).getFullYear();
  };

  // Calculate a color for the rating
  const getRatingColor = (rating) => {
    if (rating >= 8) return "#4CAF50"; // Green for great ratings
    if (rating >= 6) return "#FFC107"; // Yellow for good ratings
    return "#FF5722"; // Orange-red for lower ratings
  };

  // Truncate overview for card display
  const truncateOverview = (text, maxLength = 180) => {
    if (!text) return "No description available";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="movie-card" ref={cardRef}>
      <div className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `${IMAGE_PATH}${movie.poster_path}`
              : "https://via.placeholder.com/400x600?text=No+Image+Available"
          }
          alt={movie.title}
          loading="lazy"
        />
        <div className="movie-overlay">
          <button
            className={`heart-emoji-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {favorite ? "❤️" : "🤍"}
          </button>

          <div className="movie-description">
            {truncateOverview(movie.overview)}
          </div>

          {movie.vote_average > 0 && (
            <div
              className="movie-rating"
              style={{ color: getRatingColor(movie.vote_average) }}
            >
              <FaStar className="star-icon" /> {movie.vote_average.toFixed(1)}
            </div>
          )}
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{formatDate(movie.release_date)}</p>

        {movie.genre_ids && movie.genre_ids.length > 0 && (
          <div className="movie-genres">
            {movie.genre_ids.slice(0, 2).map((genre, index) => (
              <span key={index} className="movie-genre">
                {getGenreName(genre)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Genre mapping function
const getGenreName = (genreId) => {
  const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  return genres[genreId] || "Unknown";
};

export default MovieCard;
