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

// Function to get random rotation class
const getRandomRotation = (index) => {
  const rotations = [
    '-rotate-2',
    'rotate-2'
  ];
  // Alternate between positive and negative rotations
  return rotations[index % 2];
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
              Honestly, most of these were written way after the original event
            </p>
            <div className="mt-10 p-8 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
            {posts &&
  posts.map((post) =>
    post.type === "tweet" ? (
      <div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 h-full"
        key={post.slug}
        onClick={() => {
          if (process.env.NODE_ENV === "development") {
            Router.push(`/blog/${post.slug}`);
          } else {
            alert("Tweets are only viewable in development mode.");
          }
        }}
      >
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600">🐦</span>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-gray-800 text-lg leading-relaxed">{post.title}</p>
            <span className="text-sm text-gray-500 mt-2 block">
              {ISOToDate(post.date)}
            </span>
          </div>
        </div>
        {process.env.NODE_ENV === "development" && mounted && (
          <div className="absolute top-4 right-4">
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
    ) : post.type === "dump" ? (
      <div
        className={`relative bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-[90%] mx-auto ${getRandomRotation(posts.filter(p => p.type === 'dump').indexOf(post))} hover:rotate-0 h-fit`}
        key={post.slug}
        onClick={() => Router.push(`/blog/${post.slug}`)}
      >
        <div className="relative p-6 pt-12 bg-[#f8f8f8]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB2aWV3Qm94PSIwIDAgNCA0Ij48cGF0aCBkPSJNMSAxaDF2MUgxVjF6TTMgM2gxdjFIM1YzeiIgZmlsbD0icmdiYSgwLDAsMCwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-10"></div>
          <div className="w-full aspect-[4/3] relative">
            <img
              className="w-full h-full object-cover border border-gray-100"
              src={post.image}
              alt={post.title}
            />
          </div>
          <div className="absolute top-4 right-4">
            <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-pink-600 shadow-sm flex items-center">
              <span className="mr-1">📸</span> Photo Dump
            </span>
          </div>
        </div>
        <div className="p-8 border-t border-gray-100 bg-white">
          <h1 className="text-sm font-bold text-gray-800 mb-0.5 line-clamp-1">{post.title}</h1>
          <p className="text-gray-600 text-xs mb-1 line-clamp-1">{post.preview}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {ISOToDate(post.date)}
            </span>
            <span className="text-xs text-pink-600 font-medium flex items-center">
              View Photos <span className="ml-1">→</span>
            </span>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"></div>
        {process.env.NODE_ENV === "development" && mounted && (
          <div className="absolute top-6 right-6">
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
      <div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full"
        key={post.slug}
        onClick={() => Router.push(`/blog/${post.slug}`)}
      >
        <div className="relative">
          <img
            className="w-full h-64 object-cover rounded-t-2xl"
            src={post.image}
            alt={post.title}
          />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-600 shadow-sm">
              {calculateReadingTime(post.content)}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h1>
          <p className="text-gray-600 mb-4">{post.preview}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {ISOToDate(post.date)}
            </span>
            <span className="text-sm text-gray-600 font-medium">
              Read More →
            </span>
          </div>
        </div>
        {process.env.NODE_ENV === "development" && mounted && (
          <div className="absolute top-4 right-4">
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
