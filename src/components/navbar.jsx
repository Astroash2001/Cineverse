import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import "../css/Navbar.css";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <Link to="/" className="navbar-logo">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="navbar-logo-icon"
          >
            <path
              d="M18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 9L15 12L12 15M9 12H15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="film-strip-top"
              d="M6 4H8V6H6V4ZM10 4H12V6H10V4ZM14 4H16V6H14V4ZM18 4H20V6H18V4Z"
              fill="currentColor"
            />
            <path
              className="film-strip-bottom"
              d="M6 18H8V20H6V18ZM10 18H12V20H10V18ZM14 18H16V20H14V18ZM18 18H20V20H18V18Z"
              fill="currentColor"
            />
          </svg>
          <div className="logo-text">
            <span className="logo-primary">Cine</span>
            <span className="logo-secondary">Verse</span>
          </div>
        </Link>

        <div className="navbar-links">
          <Link
            to="/"
            className={`navbar-link ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className={`navbar-link ${
              location.pathname === "/favorites" ? "active" : ""
            }`}
          >
            Favorites
          </Link>
        </div>

        <div className="navbar-social">
          <a
            href="https://github.com/Astroash2001"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://x.com/AVINASH2002ASH"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a href="mailto:avinashsingh2003ash@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <button
          className="mobile-menu-close"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation menu"
        >
          ✕
        </button>

        <div className="mobile-menu-links">
          <Link
            to="/"
            className="mobile-menu-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="mobile-menu-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Favorites
          </Link>

          <div className="mobile-menu-social">
            <a
              href="https://github.com/Astroash2001"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub /> GitHub
            </a>
            <a
              href="https://x.com/AVINASH2002ASH"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter /> Twitter
            </a>
            <a href="mailto:avinashsingh2003ash@gmail.com">
              <FaEnvelope /> Email
            </a>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>
    </>
  );
}

export default NavBar;
