import { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

export default function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);

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

  useEffect(() => {
    const handleScroll = () => {
      // Start playing the video if it's small screen and not already playing
      if (isSmallScreen && !videoPlaying) {
        setVideoPlaying(true);
        if (videoRef.current) {
          videoRef.current.play();
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the scroll event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSmallScreen, videoPlaying]);

  return (
    <div style={{ zIndex: -1, position: 'relative', overflow: 'hidden', height: '720px' }}>
      {isSmallScreen ? (
        <video
          ref={videoRef} // Attach the ref to the video element
          src="/line.mp4"
          autoPlay={videoPlaying} // Control autoPlay with the state
          muted
          loop={false}
          playsInline // Ensure the video plays inline on mobile
          style={{
            width: '100vw',
            height: '720px',
            objectFit: 'cover',
          }}
        />
      ) : (
        <Spline scene="https://prod.spline.design/L19y2WPG8QjVI-4R/scene.splinecode" />
      )}
    </div>
  );
}
