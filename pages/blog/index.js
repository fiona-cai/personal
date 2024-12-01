import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import Header from "../../components/Header";
import data from "../../data/portfolio.json";
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";
import { getAllPosts } from "../../utils/api";
import Footer from "../../components/Footer";

// Function to calculate reading time
const calculateReadingTime = (text) => {
  const wordsPerMinute = 150;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} minute read`;
};

const Blog = ({ posts }) => {
  const showBlog = useRef(data.showBlog);
  const text = useRef();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    stagger(
      [text.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
    if (showBlog.current) stagger([text.current], { y: 30 }, { y: 0 });
    else router.push("/");
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAboutScroll = () => {
    if (router.pathname !== "/") {
      router.push("/").then(() => {
        setTimeout(() => {
          const aboutSection = document.getElementById("about");
          if (aboutSection) {
            window.scrollTo({
              top: aboutSection.offsetTop,
              left: 0,
              behavior: "smooth",
            });
          }
        }, 100);
      });
    } else {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        window.scrollTo({
          top: aboutSection.offsetTop,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  };

  const handleWorkScroll = () => {
    if (router.pathname !== "/") {
      router.push("/").then(() => {
        setTimeout(() => {
          const workSection = document.getElementById("work");
          if (workSection) {
            window.scrollTo({
              top: workSection.offsetTop,
              left: 0,
              behavior: "smooth",
            });
          }
        }, 100);
      });
    } else {
      const workSection = document.getElementById("work");
      if (workSection) {
        window.scrollTo({
          top: workSection.offsetTop,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  };

  const createBlog = () => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        router.reload(window.location.pathname);
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  const deleteBlog = (slug) => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/blog", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
        }),
      }).then(() => {
        router.reload(window.location.pathname);
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  return (
    showBlog.current && (
      <>
        <Head>
          <title>Blog</title>
        </Head>

        <div className={`relative`}>
          <div className="gradient-circle3"></div>
          <div className="gradient-circle-bottom"></div>
          <Header
            isBlog={true}
            handleWorkScroll={handleWorkScroll}
            handleAboutScroll={handleAboutScroll}
          />
          <div className="mt-10">
            <h1 ref={text} className="text-4xl text-center">
              My Journey
            </h1>
            <p className="text-center m-4 mx-[20%] opacity-50 text-sm">
              Honestly most of these were written way after the original event,
              but I’ve been keeping up with updating this page regularly since
              November 2024! (for that reason the posts are also way more
              detailed after that)
            </p>
            <div className="mt-10 p-8 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
            {posts &&
  posts.map((post) =>
    post.type === "tweet" ? (
      <div
        className="cat relative shadow-lg p-4 rounded-xl bg-white"
        key={post.slug}
        onClick={() => {
          if (process.env.NODE_ENV === "development") {
            Router.push(`/blog/${post.slug}`);
          } else {
            alert("Tweets are only viewable in development mode.");
          }
        }}
      >
        <p className="cat text-sm">{post.title}</p>
        <span className="cat text-sm mt-5 opacity-25">
          {ISOToDate(post.date)}
        </span>
        {process.env.NODE_ENV === "development" && mounted && (
          <div className="absolute top-0 right-0">
            <Button
              onClick={(e) => {
                deleteBlog(post.slug);
                e.stopPropagation();
              }}
              type={"primary"}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    ) : (
      // Regular blog post rendering
      <div
        className="cat relative shadow-lg p-4 rounded-xl bg-white"
        key={post.slug}
        onClick={() => Router.push(`/blog/${post.slug}`)}
      >
        <div>
          <img
            className="cat w-full h-60 rounded-lg object-cover"
            src={post.image}
            alt={post.title}
          />
          <div className="top-4 right-4 absolute">
            <Button type={"green"}>
              {calculateReadingTime(post.content)}
            </Button>
          </div>
        </div>
        <h1 className="cat mt-5 text-3xl">{post.title}</h1>
        <p className="cat mt-2 opacity-50 text-sm">{post.preview}</p>
        <span className="cat text-sm mt-5 opacity-25">
          {ISOToDate(post.date)}
        </span>
        {process.env.NODE_ENV === "development" && mounted && (
          <div className="absolute top-0 right-0">
            <Button
              onClick={(e) => {
                deleteBlog(post.slug);
                e.stopPropagation();
              }}
              type={"primary"}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    )
  )}

            </div>
          </div>
          <Footer></Footer>
        </div>
        {process.env.NODE_ENV === "development" && mounted && (
          <div className="fixed bottom-6 right-6">
            <Button onClick={createBlog} type={"primary"}>
              Add New Post +{" "}
            </Button>
          </div>
        )}
      </>
    )
  );
};

export async function getStaticProps() {
  const posts = getAllPosts([
    "slug",
    "title",
    "image",
    "preview",
    "author",
    "date",
    "type",
    "content",
  ]);

  posts.forEach((post) => {
    if (post.type !== "tweet") {
      post.readingTime = calculateReadingTime(post.content);
    }
  });

  // Sort posts by date in descending order (most recent first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    props: {
      posts: [...posts],
    },
  };
}

export default Blog;
