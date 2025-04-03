import "./css/App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/navbar";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import StarField from "./components/StarField";
import ScrollIndicator from "./components/ScrollIndicator";

function App() {
  const { theme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;

      // Calculate scroll percentage
      if (totalScroll) {
        const scrollPercent = (currentScroll / totalScroll) * 100;
        setScrollProgress(scrollPercent);

        // Apply transform to progress bar
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${
            scrollPercent / 100
          })`;
        }
      }

      // Show scroll indicator when page is scrolled down 300px
      if (window.scrollY > 300) {
        setShowScrollIndicator(true);
      } else {
        setShowScrollIndicator(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`app-container ${theme}`}>
      <div className="scroll-indicator" ref={progressRef}></div>
      <StarField />
      <MovieProvider>
        <BrowserRouter>
          <div className="app">
            <NavBar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/search/:query" element={<Search />} />
              </Routes>
            </main>

            {/* Animated background elements */}
            <div className="bg-element bg-element-1"></div>
            <div className="bg-element bg-element-2"></div>
            <div className="bg-element bg-element-3"></div>

            <Footer />
            <ScrollIndicator visible={showScrollIndicator} />
          </div>
        </BrowserRouter>
      </MovieProvider>
    </div>
  );
}

export default App;
