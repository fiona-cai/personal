import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove uwaterloo.network embed widget that may appear below footer
    const removeEmbed = () => {
      document.querySelectorAll("[data-webring]").forEach((el) => el.remove());
      const matches = [...document.querySelectorAll("*")].filter((el) =>
        el.textContent?.includes("UWaterloo Webring")
      );
      const root = matches.find(
        (el) => !matches.some((other) => other !== el && other.contains(el))
      );
      if (root) root.remove();
    };
    removeEmbed();
    const timer = setTimeout(removeEmbed, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
