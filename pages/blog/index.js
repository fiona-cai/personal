import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import Header from "../../components/Header";
import data from "../../data/portfolio.json";
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";
import { getAllPosts } from "../../utils/api";

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

  // Define the handleAboutScroll function
  const handleAboutScroll = () => {
    if (router.pathname !== "/") {
      // If not on the homepage, go back to the homepage
      router.push("/").then(() => {
        setTimeout(() => {
          const aboutSection = document.getElementById("about");
          if (aboutSection) {
            // Scroll to the About section after navigating
            window.scrollTo({
              top: aboutSection.offsetTop,
              left: 0,
              behavior: "smooth",
            });
          }
        }, 100); // Delay to ensure the page has loaded
      });
    } else {
      // Scroll to the About section if on the homepage
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

  // Define the handleWorkScroll function
  const handleWorkScroll = () => {
    if (router.pathname !== "/") {
      // If not on the homepage, go back to the homepage
      router.push("/").then(() => {
        setTimeout(() => {
          const workSection = document.getElementById("work");
          if (workSection) {
            // Scroll to the Work section after navigating
            window.scrollTo({
              top: workSection.offsetTop,
              left: 0,
              behavior: "smooth",
            });
          }
        }, 100); // Delay to ensure the page has loaded
      });
    } else {
      // Scroll to the Work section if on the homepage
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
        <div className="gradient-circle"></div>
        <div>
          <Header 
            isBlog={true} 
            handleWorkScroll={handleWorkScroll} 
            handleAboutScroll={handleAboutScroll} 
          />
          <div className="mt-10">
            <h1
              ref={text}
              className="text-4xl text-center">
              my journey.
            </h1>
            <div className="mt-10 p-8 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
              {posts &&
                posts.map((post) => (
                  <div
                    className="relative"
                    key={post.slug}
                    onClick={() => Router.push(`/blog/${post.slug}`)}
                  >
                    <img
                      className="w-full h-60 rounded-lg shadow-lg object-cover"
                      src={post.image}
                      alt={post.title}
                    ></img>
                    <h1 className="mt-5 text-3xl">{post.title}</h1>
                    <p className="mt-2 opacity-50 text-sm">{post.preview}</p>
                    <span className="text-sm mt-5 opacity-25">
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
                ))}
            </div>
          </div>
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
  ]);

  // Sort posts by date in descending order (most recent first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    props: {
      posts: [...posts],
    },
  };
}

export default Blog;
