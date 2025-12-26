import React, { useRef, useState, useEffect } from "react";
import { getPostBySlug, getAllPosts } from "../../utils/api";
import Header from "../../components/Header";
import ContentSection from "../../components/ContentSection";
import PhotoDump from "../../components/PhotoDump";
import Footer from "../../components/Footer";
import Head from "next/head";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import BlogEditor from "../../components/BlogEditor";
import BlogSidebar from "../../components/BlogSidebar";
import { useRouter } from "next/router";
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";
import Image from "next/image";


const BlogPost = ({ post, previousPost, allPosts }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPreviousPostHovered, setIsPreviousPostHovered] = useState(false);
  const textOne = useRef();
  const textTwo = useRef();
  const router = useRouter();

  useIsomorphicLayoutEffect(() => {
    stagger([textOne.current, textTwo.current], { y: 30 }, { y: 0 });
  }, []);

  // Reading progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>{"Blog - " + post.title}</title>
        <meta name="description" content={post.preview} />
      </Head>

      <div className={`relative min-h-screen`}>
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-50">
          <div 
            className="h-full transition-all duration-150 ease-out"
            style={{ 
              width: `${readingProgress}%`,
              background: `linear-gradient(to right, #abcca3ca, #8da0883c)`
            }}
          />
        </div>

        <div className='gradient-circle3'></div>
        <div className="gradient-circle-bottom"></div>
        
        <Header isBlog={true} />
        
        {/* Hero Section */}
        <div className="relative">
          <div className="max-w-4xl mx-auto px-8 tablet:px-8 laptop:px-12 pt-16 pb-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1
                ref={textOne}
                className="text-4xl tablet:text-5xl font-bold text-gray-900 leading-tight"
              >
                {post.title}
              </h1>

              <h3
                ref={textTwo}
                className="text-xl tablet:text-2xl laptop:text-3xl text-gray-600 font-light italic max-w-2xl"
              >
                {post.tagline}
              </h3>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mt-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{ISOToDate(post.date)}</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="max-w-5xl mx-auto px-4 tablet:px-8 laptop:px-12 mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
              <img
                className="w-full h-auto max-h-[70vh] object-cover"
                src={post.image}
                alt={post.title}
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 tablet:px-8 laptop:px-12 pb-20">
          {post.type === 'dump' ? (
            <PhotoDump content={post.content} />
          ) : (
            <ContentSection content={post.content} />
          )}

          {/* Navigation Section */}
          <div className="mt-20 pt-12 border-t border-gray-200">
            <div className={`flex items-center ${previousPost ? 'justify-between' : 'justify-end'}`}>
              {previousPost && (
                <button
                  onClick={() => router.push(`/blog/${previousPost.slug}`)}
                  className="group flex items-center space-x-2 px-4 py-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  onMouseEnter={() => setIsPreviousPostHovered(true)}
                  onMouseLeave={() => setIsPreviousPostHovered(false)}
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Previous Post</div>
                    <div 
                      className="text-base font-medium transition-colors"
                      style={{ 
                        color: '#8da088ff',
                        opacity: isPreviousPostHovered ? 0.8 : 1
                      }}
                    >
                      {previousPost.title}
                    </div>
                  </div>
                </button>
              )}
              
                <button
                  onClick={() => setShowSidebar(true)}
                  className={`px-4 py-4 rounded-xl shadow-md transition-all duration-200 font-medium flex items-center space-x-2 ${
                    isHovered ? 'shadow-lg' : ''
                  }`}
                  style={{ 
                    backgroundColor: isHovered ? '#c4d6c1' : '#d4e6d1', 
                    color: '#2d5016'
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>All Posts</span>
                </button>
            </div>
          </div>
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

      <BlogSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        currentSlug={post.slug}
        posts={allPosts}
      />
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
  const allPosts = getAllPosts([
    "slug",
    "date",
    "title",
    "image",
    "preview",
    "type",
  ]).sort((a, b) => new Date(b.date) - new Date(a.date));

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
      allPosts: allPosts, // Pass all posts for the sidebar
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
