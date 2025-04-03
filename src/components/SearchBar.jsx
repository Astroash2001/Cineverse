import { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "../css/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current.focus();
  };

  // Add keyboard shortcut for focus (press / to focus search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={`search-bar-container ${isFocused ? "focused" : ""}`}
      style={{ margin: "8rem auto 2rem" }}
    >
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" style={{ left: "22px" }} />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for movies..."
            aria-label="Search for movies"
            className="search-input"
            style={{ paddingLeft: "45px" }}
          />
        </div>

        <button
          type="submit"
          className="search-button"
          disabled={!query.trim()}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
