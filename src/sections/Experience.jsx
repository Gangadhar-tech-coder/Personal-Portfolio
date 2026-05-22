import React, { memo } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import SectionWrapper from "../components/SectionWrapper";
import { experiences } from "../data/experience";
import { fadeInUp } from "../animations/variants";

const CardContent = memo(function CardContent({ experience, align = "left" }) {
  return (
    <>
      <div className={`flex items-center gap-2 mb-2 ${align === "right" ? "justify-end" : ""}`}>
        {experience.current && (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Current
          </span>
        )}
        <span className="flex items-center gap-1 text-dark-300 text-xs">
          <Calendar size={12} />
          {experience.duration}
        </span>
      </div>

      <h3 className="text-lg font-bold text-white font-display mb-1">
        {experience.role}
      </h3>

      <div className={`flex items-center gap-2 mb-3 text-sm text-dark-200 ${align === "right" ? "justify-end" : ""}`}>
        <span>{experience.company}</span>
        <span className="w-1 h-1 bg-dark-400 rounded-full" />
        <span className="flex items-center gap-1">
          <MapPin size={12} />
          {experience.type}
        </span>
      </div>

      <ul className={`space-y-2 mb-4 ${align === "right" ? "text-right" : ""}`}>
        {experience.description.map((desc, i) => (
          <li key={i} className="text-dark-200 text-sm leading-relaxed">
            <span className="text-blue-400 mr-2">▸</span>
            {desc}
          </li>
        ))}
      </ul>

      <div className={`flex flex-wrap gap-1.5 ${align === "right" ? "justify-end" : ""}`}>
        {experience.tech.map((t) => (
          <span
            key={t}
            className={`px-2 py-0.5 bg-gradient-to-r ${experience.gradient.replace("from-", "from-").replace("to-", "to-")}/10 border border-white/[0.06] rounded text-xs text-dark-200`}
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );
});

const TimelineCard = memo(function TimelineCard({ experience, index, isLast }) {
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex items-start gap-6 md:gap-0 ${index > 0 ? "mt-12" : ""}`}>
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[19px] md:left-1/2 top-10 bottom-0 w-px bg-gradient-to-b from-blue-500/30 to-transparent -translate-x-1/2 hidden sm:block" />
      )}

      {/* Mobile layout */}
      <div className="sm:hidden flex gap-4 w-full">
        {/* Dot */}
        <div className="relative flex-shrink-0 mt-1">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, type: "spring" }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-glow-sm z-10 relative"
          >
            <Briefcase size={18} className="text-white" />
          </motion.div>
        </div>

        {/* Card */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={index}
          className="flex-1 group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 hover:shadow-glow-sm transition-[border-color,box-shadow] duration-300"
        >
          <CardContent experience={experience} />
        </motion.div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] w-full items-start gap-8">
        {/* Left content */}
        <div className={isLeft ? "" : "order-3"}>
          <motion.div
            variants={isLeft ? {
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: index * 0.15 } },
            } : {
              hidden: { opacity: 0, x: 40 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: index * 0.15 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`group bg-white/[0.03] md:backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 hover:border-white/10 hover:shadow-glow-sm transition-[border-color,box-shadow] duration-300 ${
              isLeft ? "text-right" : "text-left"
            }`}
          >
            <CardContent experience={experience} align={isLeft ? "right" : "left"} />
          </motion.div>
        </div>

        {/* Center dot */}
        <div className="relative flex flex-col items-center order-2">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, type: "spring" }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-glow-sm z-10"
          >
            <Briefcase size={20} className="text-white" />
          </motion.div>
          {!isLast && (
            <div className="w-px flex-1 bg-gradient-to-b from-blue-500/30 to-transparent min-h-[60px]" />
          )}
        </div>

        {/* Right content (empty for layout) */}
        <div className={isLeft ? "order-3" : ""} />
      </div>
    </div>
  );
});

function Experience() {
  return (
    <SectionWrapper
      id="experience"
      title="Experience"
      subtitle="My professional journey and contributions"
    >
      <div className="max-w-4xl mx-auto">
        {experiences.map((exp, index) => (
          <TimelineCard
            key={exp.id}
            experience={exp}
            index={index}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

export default memo(Experience);
