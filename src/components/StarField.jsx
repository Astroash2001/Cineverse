import { useEffect, useState } from "react";
import "../css/StarField.css";

const StarField = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const starCount = window.innerWidth < 768 ? 50 : 100;
      const newStars = [];

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100, // percentage of viewport width
          y: Math.random() * 100, // percentage of viewport height
          size: Math.random() * 2 + 1, // size between 1-3px
          opacity: Math.random() * 0.8 + 0.2, // opacity between 0.2-1
          blinkDuration: Math.random() * 5 + 2, // blink duration between 2-7s
        });
      }

      setStars(newStars);
    };

    // Initial star generation
    generateStars();

    // Regenerate on window resize
    const handleResize = () => {
      generateStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="star-field">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.blinkDuration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
