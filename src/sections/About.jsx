import React, { memo } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import SectionWrapper from "../components/SectionWrapper";
import { personalInfo, stats } from "../data/personalInfo";
import { useCountUp } from "../hooks/useCountUp";
import { fadeInUp, fadeInLeft, fadeInRight } from "../animations/variants";

const StatCard = memo(function StatCard({ stat }) {
  const [ref, count] = useCountUp(stat.value, 2000, stat.decimals);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      className="relative group p-4 bg-white/[0.03] md:backdrop-blur-sm border border-white/[0.06] rounded-xl text-center hover:bg-white/[0.06] hover:border-white/10 transition-[background-color,border-color,box-shadow] duration-300 hover:shadow-glow-sm"
    >
      <div className="text-2xl sm:text-3xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        {count}
        {stat.suffix || ""}
      </div>
      <div className="text-dark-200 text-sm mt-1">{stat.label}</div>
    </motion.div>
  );
});

function About() {
  return (
    <SectionWrapper
      id="about"
      title="About Me"
      subtitle="Get to know me a little better"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Avatar / Image */}
        <motion.div variants={fadeInLeft} className="flex justify-center">
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-3xl blur-2xl" />

            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border border-white/10 shadow-card">
              <img
                src="/self.jpeg"
                alt={personalInfo.displayName}
                className="w-full h-full object-cover grayscale contrast-[1.05] hover:grayscale-0 transition-[filter] duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating info cards */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 px-4 py-2 bg-dark-800/90 md:backdrop-blur-sm border border-white/10 rounded-xl shadow-lg"
              style={{ willChange: "transform" }}
            >
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap size={16} className="text-blue-400" />
                <span className="text-white font-medium">{personalInfo.education.cgpa} CGPA</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -top-4 -left-4 px-4 py-2 bg-dark-800/90 md:backdrop-blur-sm border border-white/10 rounded-xl shadow-lg"
              style={{ willChange: "transform" }}
            >
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-violet-400" />
                <span className="text-white font-medium">Hyderabad</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Content */}
        <div>
          <motion.p
            variants={fadeInRight}
            className="text-dark-100 text-base sm:text-lg leading-relaxed mb-8"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Education */}
          <motion.div
            variants={fadeInRight}
            className="mb-8 p-4 bg-white/[0.03] md:backdrop-blur-sm border border-white/[0.06] rounded-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap size={20} className="text-blue-400" />
              <span className="text-white font-semibold">{personalInfo.education.degree}</span>
            </div>
            <p className="text-dark-200 text-sm ml-8">
              {personalInfo.education.college} • {personalInfo.education.duration}
            </p>
          </motion.div>

          {/* Quick Facts */}
          <motion.div variants={fadeInRight} className="flex flex-wrap gap-2 mb-8">
            {personalInfo.quickFacts.map((fact) => (
              <span
                key={fact}
                className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-white/[0.06] rounded-full text-sm text-dark-100 font-medium"
              >
                {fact}
              </span>
            ))}
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default memo(About);
