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

import Image from 'next/image'



// Local Data
import data from "../data/portfolio.json";

//images


export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <div className={`relative `}>
      <Head>
        <title className="z-100">{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>
      <Header
        handleWorkScroll={handleWorkScroll}
        handleAboutScroll={handleAboutScroll}
      />
      <div className="">

        <div className="ml-8 tablet:mx-8 laptop:mt-20 mt-10 laptop:mx-32 ">
          <div className=" ml-2 mt-24 flex items-center justify-between tablet:ml-5" >
            <div className="">
              <h1
                ref={textOne}
                className="text-3xl tablet:text-4xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 text-bold w-full mob:w-full laptop:w-full"
              >
                {data.headerTaglineOne}
              </h1>
              <h1
                ref={textTwo}
                className="text-5xl tablet:text-6xl laptop:text-7xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-full"
              >
                {data.headerTaglineTwo}
              </h1>
              <h1
                ref={textThree}
                className="text-l tablet:text-2xl laptop:text-3xl laptopl:text-4xl p-1 tablet:p-2 text-bold w-full laptop:w-full"
              >
                {data.headerTaglineThree}
              </h1>

            </div>
            <div className="z-1 ">
            </div>

          </div>


        </div>
        <div className="inset-x-0 w-full absolute top-0 laptop:top-20">
          <Line></Line>
        </div>
      </div>

      <div className="mt-108 tablet:mt-96 laptop:mt-108 p-2 laptop:p-0" ref={aboutRef}>
        <h1 className="text-center text-2xl text-bold tablet:text-4xl mb-6">i like to code</h1>

        <div className="flex flex-wrap  items-center justify-center	" >
          <Image className=" object-cover hover:scale-110 transition-all ease-out duration-300 relative rounded-lg overflow-hidden transition-all ease-out duration-300 mob:h-auto" src="/images/DSC00594.jpg" width="243" height="162" layout="intrinsic" />
          <p className="m-10 font-light	 text-base  mob:w-full text-left tablet:w-2/5  text-base laptop:text-base w-full ">
            {data.aboutpara}
          </p>
          <div className="mt-24">
          <h1 className="text-center text-2xl text-bold tablet:text-4xl mb-6">skills & frameworks</h1>
            <Skills />
          </div>
        </div>

        <div className="mt-32 mx-8 laptop:mt-24 p-2 laptop:p-0" ref={workRef}>

          <h1 className="text-center text-2xl text-bold tablet:text-4xl">my work</h1>

          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-8">
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




        {/* This button should not go into production */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
