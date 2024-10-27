import Image from 'next/image';
import data from "../../data/portfolio.json";

const Skills = () => {
  return (

      <div className="flex flex-wrap justify-center items-center gap-1 tablet:gap-10 laptop:gap-8 mx-14">
        {data.skills.map((skill, index) => (
          <div key={index} className="flex flex-col items-center text-center p-4">
            <Image 
              src={skill.icon} 
              alt={skill.name} 
              width={40} 
              height={40} 
              className="mb-2 hover:scale-110 transition-transform ease-out duration-300"
            />
            <p className="text-xs">{skill.name}</p>
          </div>
        ))}
      </div>
  );
};

export default Skills;
