import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Star,
  X,
  UserCheck,
  Activity,
  PiggyBank,
  TrendingUp,
  Smartphone,
  Hospital,
  Users,
  Zap,
  Key,
  FolderOpen
} from "lucide-react";
import { Github } from "../components/Icons";
import SectionWrapper from "../components/SectionWrapper";
import { projects } from "../data/projects";
import { fadeInUp, staggerContainer } from "../animations/variants";

const iconMap = {
  attendance: UserCheck,
  speech: Activity,
  expense: PiggyBank,
  vehicle: TrendingUp,
  mobile: Smartphone,
  hospital: Hospital,
  skillswap: Users,
  asap: Zap,
  carrental: Key,
};

const ProjectIcon = memo(function ProjectIcon({ name, className = "w-6 h-6" }) {
  const IconComp = iconMap[name] || FolderOpen;
  return <IconComp className={className} />;
});

const ProjectModal = memo(function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[80vh] overflow-auto bg-dark-800 border border-white/10 rounded-2xl shadow-2xl"
      >
        {/* Header gradient */}
        <div
          className={`h-32 bg-gradient-to-r ${project.gradient} relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-dark-950/80 border border-white/10 flex items-center justify-center text-white/90 shadow-glow-sm">
              <ProjectIcon name={project.icon} className="w-8 h-8 text-white" />
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white font-display">
                {project.title}
              </h3>
              <span className="text-sm text-dark-200">{project.category}</span>
            </div>
            {project.featured && (
              <span className="flex items-center gap-1 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-medium">
                <Star size={12} className="fill-amber-400" />
                Featured
              </span>
            )}
          </div>

          <p className="text-dark-100 leading-relaxed mb-6">
            {project.longDescription}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-300 font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-colors duration-300"
          >
            <Github size={18} />
            View on GitHub
            <ExternalLink size={14} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
});

const ProjectCard = memo(function ProjectCard({ project, onOpen }) {
  const isFeatured = project.featured;

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => onOpen(project)}
      className={`group relative cursor-pointer bg-white/[0.03] md:backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/10 hover:shadow-glow-sm transition-[border-color,box-shadow] duration-300 ${
        isFeatured ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      {/* Gradient banner */}
      <div
        className={`h-40 sm:h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-dark-950/80 border border-white/10 flex items-center justify-center text-white/90 shadow-glow-sm group-hover:scale-110 transition-transform duration-300">
            <ProjectIcon name={project.icon} className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        </div>

        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 px-2.5 py-1 bg-black/30 backdrop-blur-sm rounded-full text-amber-400 text-xs font-medium">
              <Star size={12} className="fill-amber-400" />
              Featured
            </span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-1 bg-black/30 backdrop-blur-sm rounded-full text-white text-xs font-medium">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-dark-200 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 bg-white/5 border border-white/[0.06] rounded text-xs text-dark-200"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-0.5 bg-white/5 border border-white/[0.06] rounded text-xs text-dark-300">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* GitHub Link */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 text-sm text-dark-200 hover:text-blue-400 transition-colors"
        >
          <Github size={16} />
          <span>View Code</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );
});

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const featured = projects.filter((p) => p.featured);
  const standard = projects.filter((p) => !p.featured);

  return (
    <SectionWrapper
      id="projects"
      title="Projects"
      subtitle="Showcasing my work in AI, ML, and full-stack development"
    >
      {/* Featured Projects */}
      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-2 gap-6 mb-8"
      >
        {featured.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={setSelectedProject}
          />
        ))}
      </motion.div>

      {/* Standard Projects */}
      <motion.div
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {standard.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={setSelectedProject}
          />
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}

export default memo(Projects);
