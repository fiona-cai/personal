import React from "react";
import Image from 'next/image';

const WorkCard = ({ img, name, headline, description, onClick }) => {
  return (
    <div
      className="bg-[#ffffff] overflow-hidden rounded-lg p-2 py-6 laptop:p-4 first:ml-0 link shadow hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick && onClick(); } }}
      aria-label={name ? `Open ${name}` : 'Open project'}
    >
      <div
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-48 mob:h-auto"
        style={{ height: "180px" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 z-10"></div>
            <Image
          alt={name}
          className="h-full w-full object-cover group-hover:scale-105 transition-all ease-out duration-300"
          src={img}
            width={400}
            height={300}
            />
      </div>
      
      <div className="mt-5">
        <h1 className="text-2xl font-medium">
          {name ? name : "Project Name"}
        </h1>
        <h3 className="text-xl opacity-80 mt-1">
          {headline ? headline : "Headline"}
        </h3>
        {/* Description hidden in grid cards; shown in modal on click */}
      </div>
    </div>
  );
};

export default WorkCard;
