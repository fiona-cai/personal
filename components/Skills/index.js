import Image from 'next/image';
import data from "../../data/portfolio.json";
import { useState } from 'react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Categorize skills
  const categories = {
    'Languages': ['Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'Go'],
    'Frontend & Web': ['Angular', 'Bootstrap', 'CSS', 'HTML', 'jQuery', 'Next.js', 'React', 'Spring', 'Tailwind CSS', 'Three.js'],
    'Backend & Databases': ['Flask', 'FastAPI', 'Node.js', 'PostgresSQL'],
    'Development Tools': ['AWS', 'Git', 'Jenkins', 'Jira', 'JSON', 'Vercel'],
    'Design': ['Illustrator', 'Premiere Pro', 'Figma'],
  };

  const getCategoryForSkill = (skillName) => {
    for (const [category, skills] of Object.entries(categories)) {
      if (skills.includes(skillName)) return category;
    }
    return 'Other Technologies';
  };

  const filteredSkills = activeCategory === 'all' 
    ? data.skills 
    : data.skills.filter(skill => getCategoryForSkill(skill.name) === activeCategory);

  return (
    <div className="w-full">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
            activeCategory === 'all'
              ? 'bg-white/80 text-gray-800 shadow-sm'
              : 'text-gray-600 hover:bg-white/40'
          }`}
        >
          All
        </button>
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeCategory === category
                ? 'bg-white/80 text-gray-800 shadow-sm'
                : 'text-gray-600 hover:bg-white/40'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="flex flex-wrap justify-center items-center gap-4 tablet:gap-6 laptop:gap-8 mx-4 py-6 px-[8%] min-h-[300px]">
        {filteredSkills.map((skill, index) => (
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
    </div>
  );
};

export default Skills;
