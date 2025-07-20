import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

import React from 'react';
const App = ({ Component, pageProps }) => {
    React.useEffect(() => {
        const handleMouseMove = (e) => {
            const trail = document.createElement('div');
            trail.className = 'matcha-trail';
            trail.style.left = `${e.clientX - 9}px`;
            trail.style.top = `${e.clientY - 9}px`;
            document.body.appendChild(trail);
            setTimeout(() => {
                trail.style.opacity = '0';
                trail.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    trail.remove();
                }, 400);
            }, 10);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default App;
