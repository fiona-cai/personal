import React from "react";
import Socials from "../Socials";
import Link from "next/link";
import Button from "../Button";

const Footer = ({}) => {
  return (
    <>
              <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-24"></div>

      <div className="my-2 laptop:mt-1 p-2 laptop:p-0">
        <div>
          <div className="">
            <div className="flex justify-center">
              <Socials />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
