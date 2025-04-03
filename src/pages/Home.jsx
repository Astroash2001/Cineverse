import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { getPopularMovies, searchMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

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

    // Only fetch popular movies when we're not searching
    if (!searchQuery) {
      fetchMovies();
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    setSearchQuery(query);
    setIsSearching(true);

    try {
      setLoading(true);
      const results = await searchMovies(query);
      setMovies(results || []);
      setError(null);
    } catch (err) {
      console.error("Error searching movies:", err);
      setError("Failed to search movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="hero-title-container">
          <h1 className="hero-title">Discover</h1>
          <h1 className="hero-title accent">Amazing</h1>
          <h1 className="hero-title">Movies</h1>
        </div>
        <p className="hero-description">
          Explore the latest and greatest films from around the world. Search
          for any movie you're curious about by title, actor, or genre. Discover
          hidden gems, trending blockbusters, and classics from every era. Get
          detailed information including ratings, release dates, and plot
          summaries. Save your favorites to your personal collection and build
          your ultimate movie watchlist. Our beautiful interface makes finding
          your next movie night selection a delightful experience.
        </p>

        <SearchBar onSearch={handleSearch} />

        <div className="hero-buttons">
          <Link to="/favorites">
            <button className="hero-button primary">View Favorites</button>
          </Link>
        </div>
      </div>

      <div className="movies-container">
        <h2 className="section-title">
          {isSearching
            ? `Search Results for "${searchQuery}"`
            : "Popular Movies"}
        </h2>

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
            {isSearching ? (
              <p>
                No movies found for "{searchQuery}". Try a different search
                term.
              </p>
            ) : (
              <p>No movies found. Please try again later.</p>
            )}
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
