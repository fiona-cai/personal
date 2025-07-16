import React, { useRef, useState } from "react";
import { getPostBySlug, getAllPosts } from "../../utils/api";
import Header from "../../components/Header";
import ContentSection from "../../components/ContentSection";
import PhotoDump from "../../components/PhotoDump";
import Footer from "../../components/Footer";
import Head from "next/head";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import BlogEditor from "../../components/BlogEditor";
import { useRouter } from "next/router";
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";


const BlogPost = ({ post, previousPost }) => {
  const [showEditor, setShowEditor] = useState(false);
  const textOne = useRef();
  const textTwo = useRef();
  const router = useRouter();

  useIsomorphicLayoutEffect(() => {
    stagger([textOne.current, textTwo.current], { y: 30 }, { y: 0 });
  }, []);

  return (
    <>
      <Head>
        <title>{"Blog - " + post.title}</title>
        <meta name="description" content={post.preview} />
      </Head>

      <div className={`relative `}>
      <div className='gradient-circle3'></div>

          <div className="gradient-circle-bottom"></div>
        <Header isBlog={true} />
        <div className="p-[0%]">
          <div className="flex flex-col">
            <h1
              ref={textOne}
              className="mt-10 px-2 text-3xl tablet:text-4xl mob:text-3xl laptop:text-5xl text-bold text-center"
            >
              {post.title}
            </h1>

            <h3
              ref={textTwo}
              className="mt-2 px-2 text-xl laptop:text-2xl text-darkgray opacity-50 text-center"
            >
              {post.tagline}
            </h3>
            <span className="mt-4 text-xs text-gray-500 text-center">
                          {ISOToDate(post.date)}
                        </span>
          </div>
          <div className="mx-12">
          <img
            className="w-auto m-auto mt-10 h-auto max-h-screen rounded-lg shadow-lg object-cover"
            src={post.image}
            alt={post.title}
          ></img>
          </div>
          {post.type === 'dump' ? (
            <PhotoDump content={post.content} />
          ) : (
            <ContentSection content={post.content} />
          )}

          {/* Previous Blog Button */}
          {previousPost && (
            <Button
              onClick={() => router.push(`/blog/${previousPost.slug}`)}
              className="mt-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md shadow-md"
            >
              Previous Blog: {previousPost.title}
            </Button>
          )}
        </div>
        <Footer />
      </div>
      
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={() => setShowEditor(true)} type={"primary"}>
            Edit this blog
          </Button>
        </div>
      )}

      {showEditor && (
        <BlogEditor
          post={post}
          close={() => setShowEditor(false)}
          refresh={() => router.reload(window.location.pathname)}
        />
      )}
    </>
  );
};

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "date",
    "slug",
    "preview",
    "title",
    "tagline",
    "image",
    "content",
    "type",
  ]);

  // Get and sort all posts by date in descending order
  const allPosts = getAllPosts(["slug", "date", "title"]).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Find the previous post by checking if it has an earlier date than the current post
  const previousPost = allPosts.find(
    (p) => new Date(p.date) < new Date(post.date)
  );

  return {
    props: {
      post: {
        ...post,
      },
      previousPost: previousPost || null, // Pass the previous post as a prop, or null if none exists
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default BlogPost;
