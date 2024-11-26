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
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Play video only if on small screen and not already playing
      if (isSmallScreen && !videoPlaying) {
        setVideoPlaying(true);
        if (videoRef.current) {
          videoRef.current.play();
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSmallScreen, videoPlaying]);

  return (
    <><div className="gradient-circle2 hidden laptopl:block"></div><div style={{ zIndex: -2, position: 'relative', overflow: 'hidden', height: '720px', width:'100vw' }}>
      {isSmallScreen ? (
        <>
          {!videoPlaying && ( // Show thumbnail if video is not playing
            <img
              src="/thumbnail.png" // Replace with your thumbnail image source
              alt="Video Thumbnail"
              style={{
                width: '100vw',
                height: '720px',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1, // Ensure the thumbnail is above the video
              }} />
          )}
          <video
            ref={videoRef} // Attach the ref to the video element
            src="/line.mp4"
            muted
            loop
            playsInline // Ensure the video plays inline on mobile
            style={{
              width: '100vw',
              height: '720px',
              objectFit: 'cover',
              position: 'absolute',
              display: videoPlaying ? 'block' : 'none', // Hide video until it starts
              zIndex: 0, // Ensure the video is behind the thumbnail
            }}
            onCanPlay={() => {
              if (videoPlaying) {
                videoRef.current.play();
              }
            } } />
        </>
      ) : (
        <Spline scene="https://prod.spline.design/L19y2WPG8QjVI-4R/scene.splinecode" />
      )}
    </div></>
  );
}
