import React, { memo } from "react";
import { motion } from "framer-motion";
import { Award, Trophy, ExternalLink } from "lucide-react";
import SectionWrapper from "../components/SectionWrapper";
import { certifications, hackathons, achievementStats } from "../data/achievements";
import { personalInfo } from "../data/personalInfo";
import { useCountUp } from "../hooks/useCountUp";
import { fadeInUp, staggerContainer } from "../animations/variants";

const AchievementStat = memo(function AchievementStat({ stat }) {
  const [ref, count] = useCountUp(stat.value, 2000, 0);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      className="text-center p-6 bg-white/[0.03] md:backdrop-blur-sm border border-white/[0.06] rounded-2xl hover:border-white/10 hover:shadow-glow-sm transition-[border-color,box-shadow] duration-300"
    >
      <span className="text-3xl mb-2 block">{stat.icon}</span>
      <div className="text-3xl sm:text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        {count}
        {stat.suffix || ""}
      </div>
      <div className="text-dark-200 text-sm mt-1">{stat.label}</div>
    </motion.div>
  );
});

const CertificationCard = memo(function CertificationCard({ cert }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative bg-white/[0.03] md:backdrop-blur-sm border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 hover:shadow-glow-sm transition-[border-color,box-shadow] duration-300 overflow-hidden"
    >
      {/* Subtle gradient bg on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{cert.icon}</span>
          <span
            className={`px-2 py-0.5 bg-gradient-to-r ${cert.color} bg-clip-text text-transparent text-xs font-bold border border-white/10 rounded-full`}
          >
            {cert.badge}
          </span>
        </div>
        <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
          {cert.title}
        </h3>
        <p className="text-dark-300 text-xs">{cert.issuer}</p>
      </div>
    </motion.div>
  );
});

const HackathonCard = memo(function HackathonCard({ hackathon }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -3, scale: 1.01 }}
      className="group flex items-center gap-4 p-4 bg-white/[0.03] md:backdrop-blur-sm border border-white/[0.06] rounded-xl hover:border-white/10 hover:shadow-glow-sm transition-[border-color,box-shadow] duration-300"
    >
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${hackathon.color} flex items-center justify-center flex-shrink-0`}>
        <Trophy size={18} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white text-sm font-medium truncate group-hover:text-blue-400 transition-colors">
          {hackathon.title}
        </h4>
        <p className="text-dark-300 text-xs">{hackathon.role}</p>
      </div>
    </motion.div>
  );
});

function Achievements() {
  return (
    <SectionWrapper
      id="achievements"
      title="Achievements & Certifications"
      subtitle="Milestones in my learning journey"
    >
      {/* Stats Row */}
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
      >
        {achievementStats.map((stat) => (
          <AchievementStat key={stat.label} stat={stat} />
        ))}
      </motion.div>

      {/* Certifications */}
      <motion.div variants={fadeInUp} className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Award size={24} className="text-blue-400" />
          <h3 className="text-xl font-bold text-white font-display">
            Certifications
          </h3>
        </div>
        <motion.div
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {certifications.map((cert) => (
            <CertificationCard key={cert.id} cert={cert} />
          ))}
        </motion.div>
      </motion.div>

      {/* Hackathons */}
      <motion.div variants={fadeInUp}>
        <div className="flex items-center gap-3 mb-6">
          <Trophy size={24} className="text-violet-400" />
          <h3 className="text-xl font-bold text-white font-display">
            Hackathons & Competitions
          </h3>
        </div>
        <motion.div
          variants={staggerContainer}
          className="grid sm:grid-cols-2 gap-4"
        >
          {hackathons.map((h) => (
            <HackathonCard key={h.id} hackathon={h} />
          ))}
        </motion.div>
      </motion.div>

      {/* View Certificates Link */}
      <motion.div variants={fadeInUp} className="text-center mt-10">
        <a
          href={personalInfo.links.certificates}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20 rounded-xl text-blue-400 font-medium hover:bg-blue-500/20 hover:shadow-glow-sm transition-[background-color,box-shadow] duration-300"
        >
          <Award size={18} />
          View All Certificates
          <ExternalLink size={14} />
        </a>
      </motion.div>
    </SectionWrapper>
  );
}

export default memo(Achievements);
