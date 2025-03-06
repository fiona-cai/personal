import { useRef } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Spline from "../components/Spline";
import Line from "../components/Line";
import Skills from "../components/Skills";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from 'next/image'

// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  const router = useRouter();
  // Refs for sections
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();
  const skillsRef = useRef();
  const blogRef = useRef();

  // Scroll animation function
  useEffect(() => {
    const handleScroll = () => {
      const sections = [aboutRef, skillsRef, workRef, blogRef];
      sections.forEach(ref => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom >= 0;
          if (isVisible) {
            ref.current.classList.add('animate-fade-in-up');
            ref.current.style.opacity = '1';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handling Scroll
  const handleWorkScroll = () => {
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    } else {
      window.scrollTo({
        top: workRef.current.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleAboutScroll = () => {
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    } else {
      window.scrollTo({
        top: aboutRef.current.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <div className={`relative`}>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        .section-spacing {
          margin-top: 25vh;
          margin-bottom: 25vh;
          opacity: 0;
        }
        .parallax-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          transform: translateZ(-1px) scale(2);
          z-index: -1;
        }
        .floral-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            0 1px 2px rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
        }
        .floral-accent {
          position: absolute;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle at center, rgba(255, 192, 203, 0.2), transparent);
          border-radius: 50%;
          filter: blur(20px);
        }
      `}</style>

      <div className='gradient-circle3'></div>
      <Head>
        <title className="z-100">{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>
      <Header
        handleWorkScroll={handleWorkScroll}
        handleAboutScroll={handleAboutScroll}
      />

      {/* Hero Section */}
      <div className="">
        <div className="ml-8 tablet:mx-8 laptop:mt-20 mt-10 laptop:mx-24">
          <div className=" ml-2 mt-24 flex items-center justify-between tablet:ml-5" >
            <div className="">
              <h1
                ref={textOne}
                className="text-3xl tablet:text-4xl laptop:text-5xl p-1 tablet:p-2 text-bold w-full mob:w-full laptop:w-full"
              >
                {data.headerTaglineOne}
              </h1>

              <h1
                ref={textTwo}
                className="text-5xl tablet:text-6xl laptop:text-7xl p-1 tablet:p-2 text-bold w-full laptop:w-full"
              >
                {data.headerTaglineTwo}
              </h1>
              <h1
                ref={textThree}
                className="text-l flex-row-reverse tablet:text-2xl laptop:text-3xl flex items-center p-1 tablet:p-2 text-bold w-full laptop:w-full "
              ><Image className="" src="/images/image.png" width="25" height="25" layout="intrinsic" />
                {data.headerTaglineThree}
              </h1>
            </div>
            <div className="z-1 ">
            </div>
          </div>
        </div>
        <div className="inset-x-0 w-full max-w-full absolute top-0 laptop:top-20">
          <Line></Line>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-108 tablet:mt-96 laptop:mt-108 p-2 laptop:p-0" ref={aboutRef} id="about">
        <h1 className=" text-center text-2xl text-bold tablet:text-4xl mb-16 shiny">I like to code.</h1>
        <div className="flex flex-wrap items-center justify-center">
          <Image 
            className="object-cover hover:scale-110 transition-all ease-out duration-300 relative rounded-lg overflow-hidden mob:h-auto" 
            src="/images/DSC00594.jpg" 
            width="243" 
            height="162" 
            layout="intrinsic" 
          />
          <p className="m-10 mx-16 mob:mx-8 tablet:mr-0 font-light text-base mob:w-full text-left tablet:w-[45%] laptop:text-base w-full" style={{ fontSize: '1em' }}>
            {data.aboutpara}
          </p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="section-spacing relative px-4" ref={skillsRef}>
        <div className="floral-accent top-0 left-0 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="floral-accent bottom-0 right-0 transform translate-x-1/2 translate-y-1/2"></div>
        
        <div className="floral-card p-8 tablet:p-12 laptop:p-16 max-w-6xl mx-auto">
          <h1 className="text-center text-2xl text-bold tablet:text-4xl mb-16 relative">
            Skills & Frameworks
          </h1>
          <Skills />
        </div>
      </div>

      {/* Work Section */}
      <div className="section-spacing mx-10" ref={workRef} id="work">
        <div className="text-center mb-12">
          <h1 className="text-2xl text-bold tablet:text-4xl mb-4">My Work</h1>
          <p className="text-center opacity-50 text-md">
            A collection of my projects and experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-12 mx-[0.5vw]">
          {data.projects.map((project) => (
            <WorkCard
              key={project.id}
              img={project.imageSrc}
              name={project.title}
              headline={project.headline}
              description={project.description}
              onClick={() => window.open(project.url)}
            />
          ))}
        </div>
      </div>

      {/* Blog Section */}
      <div className="mt-12" ref={blogRef}>
        <h1 className="text-center text-2xl text-bold tablet:text-4xl mb-8 shiny">↓ more fiona stuff ↓</h1>
        <div className="mb-36 flex justify-center items-center relative">
          <div className="absolute w-72 h-72 bg-gradient-to-r from-purple-300/20 via-pink-300/20 to-blue-300/20 rounded-full blur-3xl -z-10 left-1/2 -translate-x-1/2"></div>
          <div className="transform hover:scale-110 transition-all duration-300 hover:-translate-y-1">
            {<Button 
              className="px-12 py-6 text-lg tablet:text-xl laptop:text-2xl font-medium shadow-lg hover:shadow-xl" 
              type="big" 
              onClick={() => router.push("/blog")}
            >
              Visit My Blog
            </Button>}
          </div>
        </div>
        
        <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-24"></div>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-5 right-5">
          <Link href="/edit">
            <Button type="primary">Edit Data</Button>
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
}

