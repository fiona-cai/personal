import Image from 'next/image';
import data from "../../data/portfolio.json";
import { useState } from 'react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Categorize skills
  const categories = {
    'Programming Languages': ['Python', 'Java', 'JavaScript', 'TypeScript'],
    'Web Technologies': ['Angular', 'Bootstrap', 'CSS', 'HTML', 'jQuery', 'Next.js', 'React', 'Spring', 'Tailwind CSS', 'Three.js'],
    'Backend & Databases': ['Flask', 'FastAPI', 'Node.js', 'PostgresSQL'],
    'Development Tools': ['AWS', 'Git', 'Jenkins', 'Jira', 'JSON', 'Vercel'],
    'Design & Creative': ['Adobe Illustrator', 'Adobe Premiere Pro', 'Figma'],
    'Other Technologies': ['Godot', 'LaTeX', 'OpenCV']
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
    <div className="w-full max-w-4xl mx-auto">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-1 mb-4">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
            activeCategory === 'all'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1 px-2">
        {filteredSkills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-1 bg-white rounded"
          >
            <div className="relative w-5 h-5">
              <Image
                src={skill.icon}
                alt={skill.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className="text-[10px] text-center text-gray-600 mt-0.5">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
