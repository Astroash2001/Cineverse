import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getPopularMovies();
        setMovies(data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="hero-title">
          Discover <span className="accent">Amazing</span> Movies
        </h1>
        <p className="hero-description">
          Explore the latest and greatest films from around the world. Find your
          next favorite movie and save it to your personal collection.
        </p>
        <div className="hero-buttons">
          <Link to="/favorites">
            <button className="hero-button primary">View Favorites</button>
          </Link>
        </div>
      </div>

      <div className="movies-container">
        <h2 className="section-title">Popular Movies</h2>

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading amazing movies...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="no-movies">
            <p>No movies found. Please try again later.</p>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="movies-grid">
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className="movie-item animate-fadeUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
