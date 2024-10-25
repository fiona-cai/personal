import { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

export default function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Function to check the screen size
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 650);
    };

    // Initial check
    checkScreenSize();

    // Add an event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div style={{ zIndex: -1, position: 'relative', overflow: 'hidden', height: '720px' }}>
      {isSmallScreen ? (
        <video
          src="/line.mp4"
          autoPlay
          muted
          loop={false}
          style={{
            width: '100vw',   // Video width adjusts to the viewport width
            height: '720px',    // Height will auto-adjust
            objectFit: 'cover', // Ensures the video covers the available space
          }}
        />
      ) : (
        <Spline scene="https://prod.spline.design/L19y2WPG8QjVI-4R/scene.splinecode" />
      )}
    </div>
  );
}
