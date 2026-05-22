import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { skillCategories } from "../data/skills";
import { fadeInUp, staggerContainer } from "../animations/variants";

const SkillBar = memo(function SkillBar({ name, level, delay = 0 }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-dark-100 text-sm font-medium group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="text-dark-300 text-xs font-mono">{level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full blur-sm opacity-50" />
        </motion.div>
      </div>
    </motion.div>
  );
});

// Pre-compute flattened badge list outside render
const allSkillBadges = skillCategories.flatMap((cat) =>
  cat.skills.map((skill) => ({ key: `${cat.id}-${skill.name}`, name: skill.name }))
);

function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  const activeSkills =
    skillCategories.find((cat) => cat.id === activeCategory)?.skills || [];

  return (
    <SectionWrapper
      id="skills"
      title="Skills & Technologies"
      subtitle="The tools and technologies I work with"
    >
      {/* Category Tabs */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {skillCategories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-500/20 to-violet-500/20 border border-blue-500/30 text-white shadow-glow-sm"
                  : "bg-white/[0.03] border border-white/[0.06] text-dark-200 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <Icon size={16} />
              {category.title}
            </button>
          );
        })}
      </motion.div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -20 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/[0.02] md:backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 sm:p-8">
            <div className="grid gap-5">
              {activeSkills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={index}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* All Skills Overview (Badge grid) */}
      <motion.div variants={fadeInUp} className="mt-16">
        <h3 className="text-center text-white font-semibold text-lg mb-6">
          Full Stack Overview
        </h3>
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {allSkillBadges.map((badge) => (
            <span
              key={badge.key}
              className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-dark-200 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/10 transition-colors duration-200 cursor-default"
            >
              {badge.name}
            </span>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

export default memo(Skills);
