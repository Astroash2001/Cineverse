import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/api";
import "../css/Search.css";

function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useParams();

  useEffect(() => {
    async function fetchSearchResults() {
      setLoading(true);
      setError(null);

      try {
        const data = await searchMovies(query);
        setResults(data || []);
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to load search results. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [query]);

  return (
    <div className="search-container">
      <h1 className="search-title">
        Search Results for <span className="search-query">"{query}"</span>
      </h1>

      {loading && (
        <div className="search-loading">
          <div className="loading-spinner"></div>
          <p>Searching movies...</p>
        </div>
      )}

      {error && (
        <div className="search-error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && results.length === 0 && (
        <div className="no-results">
          <h2>No movies found</h2>
          <p>Try a different search term or check your spelling.</p>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <>
          <p className="results-count">{results.length} movies found</p>
          <div className="search-results movies-grid">
            {results.map((movie, index) => (
              <div
                key={movie.id}
                className="search-result-item animate-fadeUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
