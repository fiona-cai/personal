import Image from 'next/image';
import data from "../../data/portfolio.json";

const Skills = () => {
  return (
      <div className="flex flex-wrap justify-center items-center gap-4 tablet:gap-6 laptop:gap-8 mx-4 py-6 px-[8%]">
        {data.skills.map((skill, index) => (
          <div key={index} className="flex flex-col items-center text-center p-1">
            <Image 
              src={skill.icon} 
              alt={skill.name} 
              width={0} 
              height={0} 
              className="w-[2rem] h-[2rem] mb-2 hover:scale-110 transition-transform ease-out duration-300"
            />
            <p className="text-s">{skill.name}</p>
          </div>
        ))}
      </div>
  );
};

export default Skills;
