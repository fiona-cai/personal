import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../Button";
// Local Data
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Set the theme to light by default
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  const { name, showBlog, showResume } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <div className="flex items-center justify-between p-5 bg-white z-10">
        <h2 onClick={() => router.push("/")} className="cat text-2xl font-medium z-10">
          {name.toLowerCase()}
        </h2>
        <div className="flex items-center space-x-4">
          <Button className="hover:bg-[#ffffff]" onClick={handleAboutScroll}>About</Button>
          <Button onClick={handleWorkScroll}>Work</Button>
          {showBlog && <Button onClick={() => router.push("/blog")}>Blog</Button>}
        </div>
      </div>    
    </>
  );
};

export default Header;
