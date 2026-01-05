import React from "react";
import Socials from "../Socials";
import Link from "next/link";
import Button from "../Button";

const Footer = ({}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style jsx>{`
        @keyframes arrowBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .arrow-hover:hover {
          animation: arrowBounce 0.6s ease-in-out infinite;
        }
      `}</style>
      <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-24"></div>

      <div className="my-4 pb-4 px-8 laptop:px-12">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <Socials />
            </div>
            <div className="flex-1 flex justify-center items-center gap-2">
              <a href='https://cs.uwatering.com/#https://fiona-cai.vercel.app?nav=prev'>←</a>
              <a href='https://cs.uwatering.com/#https://fiona-cai.vercel.app/' target='_blank' rel="noopener noreferrer">
                <img
                  src='https://cs.uwatering.com/icon.black.svg'
                  alt='CS Webring'
                  style={{ width: '24px', height: 'auto', opacity: 0.8 }}
                />
              </a>
              <a href='https://cs.uwatering.com/#https://fiona-cai.vercel.app?nav=next'>→</a>
            </div>
            <div className="flex-1 flex justify-end">
              <button 
                onClick={scrollToTop}
                className="cursor-pointer hover:opacity-70 transition-opacity arrow-hover"
                aria-label="Scroll to top"
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
