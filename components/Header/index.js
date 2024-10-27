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

  setTheme("light");

  const { name, showBlog, showResume } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>

      {/* Desktop Header */}
      <div className="flex items-center justify-between p-5 bg-white z-10">
        <h1 onClick={() => router.push("/")} className="cursor-pointer text-xl font-medium">
          {name}
        </h1>
        <div className="flex items-center space-x-4">
          <Button onClick={handleAboutScroll}>About</Button>
          <Button onClick={handleWorkScroll}>Work</Button>
          {showBlog && <Button onClick={() => router.push("/blog")}>Blog</Button>}
        </div>
      </div>    
      </>
  );
};

export default Header;
