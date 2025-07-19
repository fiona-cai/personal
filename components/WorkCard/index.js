import React from "react";
import Button from "../Button";

const WorkCard = ({ img, name, headline, description, onClick }) => {
  return (
    <div className="bg-[#ffffff] overflow-hidden rounded-lg p-2 py-6 laptop:p-4 first:ml-0 link shadow hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-48 mob:h-auto"
        style={{ height: "180px" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 z-10"></div>
        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Button type={"primary"} onClick={onClick}>View Project →</Button>
        </div>
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
        <div className="relative description-wrapper px-1 bg-[#ffffff] rounded-sm mt-2">
          <p className="description text-xl opacity-50 text-sm max-h-36 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {description ? description : "Description"}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
