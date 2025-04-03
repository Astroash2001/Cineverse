import { FaGithub, FaTwitter, FaEnvelope, FaHeart } from "react-icons/fa";
import "../css/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" className="footer-logo-svg">
              <circle cx="12" cy="12" r="10" className="logo-circle" />
              <path
                d="M8 12L18 12M8 7L13 7M8 17L16 17"
                className="logo-lines"
              />
            </svg>
          </div>
          <span className="footer-brand">CineVerse</span>
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <h4>Navigation</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/favorites">Favorites</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
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
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {currentYear} CineVerse - Made with{" "}
          <FaHeart className="heart-icon" /> for movie lovers
        </p>
        <p className="footer-disclaimer">
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </p>
        <p className="footer-developer">
          Developed by{" "}
          <a
            href="https://github.com/Astroash2001"
            target="_blank"
            rel="noopener noreferrer"
          >
            Avinash Singh
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
