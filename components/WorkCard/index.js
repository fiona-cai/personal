import React from "react";

const WorkCard = ({ img, name, headline, description, onClick }) => {
  return (
    <div
      className="overflow-hidden rounded-lg p-2 py-6 laptop:p-4 first:ml-0 link"
      onClick={onClick}
    >
      <div
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-48 mob:h-auto"
        style={{ height: "300px" }}
      >
        <img
          alt={name}
          className="h-full w-full object-cover hover:scale-110 transition-all ease-out duration-300"
          src={img}
        ></img>
      </div>
      <h1 className="mt-5 text-3xl font-medium">
        {name ? name : "Project Name"}
      </h1>
      <h2 className="text-xl opacity-80">
        {headline ? headline : "Headline"}
      </h2>
      <h2 className="text-xl opacity-50 text-sm mt-2">
        {description ? description : "Description"}
      </h2>
    </div>
  );
};

export default WorkCard;
