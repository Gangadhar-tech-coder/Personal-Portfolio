import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitFork } from "lucide-react";
import { Github } from "../components/Icons";
import SectionWrapper from "../components/SectionWrapper";
import { GITHUB_USERNAME, POPULAR_REPOS } from "../utils/constants";
import { personalInfo } from "../data/personalInfo";
import { fadeInUp, staggerContainer } from "../animations/variants";

const theme = "tokyonight";
const statsUrl = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=${theme}&hide_border=true&bg_color=00000000&title_color=60a5fa&icon_color=8b5cf6&text_color=94a3b8`;
const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=${theme}&hide_border=true&bg_color=00000000&title_color=60a5fa&text_color=94a3b8`;
const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=${theme}&hide_border=true&background=00000000&stroke=1e293b&ring=3b82f6&fire=8b5cf6&currStreakLabel=60a5fa`;

// Safe Image Wrapper with local error boundary fallback
const SafeGitHubImage = memo(({ src, alt, className }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError) {
    return (
      <div className="w-full min-h-[140px] rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center p-4 text-center">
        <span className="text-xs text-dark-300 font-medium">Stats server unavailable</span>
        <span className="text-[10px] text-dark-400 mt-1">Rendering paused for external assets</span>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[140px] flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 bg-white/[0.02] animate-pulse rounded-xl" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
    </div>
  );
});

SafeGitHubImage.displayName = "SafeGitHubImage";

const RepoCard = memo(({ repo }) => {
  return (
    <motion.a
      variants={fadeInUp}
      href={repo.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4, scale: 1.02 }}
      className="group flex flex-col justify-between p-4 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl hover:border-white/10 hover:shadow-glow-sm transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-dark-600 flex items-center justify-center flex-shrink-0 mt-0.5">
          <GitFork size={16} className="text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-white text-sm font-semibold truncate group-hover:text-blue-400 transition-colors">
              {repo.name}
            </span>
          </div>
          <p className="text-dark-200 text-xs line-clamp-2 leading-relaxed">
            {repo.description}
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-2 border-t border-white/5">
        <span className="inline-flex items-center gap-1.5 text-[10px] text-dark-300 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          {repo.language}
        </span>
        <ExternalLink size={12} className="text-dark-400 group-hover:text-blue-400 transition-colors" />
      </div>
    </motion.a>
  );
});

RepoCard.displayName = "RepoCard";

function GitHubStats() {
  return (
    <SectionWrapper
      id="github"
      title="GitHub Activity"
      subtitle="My open-source contributions and coding stats"
    >
      {/* Stats Cards */}
      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        <motion.div
          variants={fadeInUp}
          className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-4 hover:border-white/10 transition-all duration-300 flex items-center justify-center"
        >
          <SafeGitHubImage
            src={statsUrl}
            alt="GitHub Stats"
            className="w-full max-w-md"
          />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-4 hover:border-white/10 transition-all duration-300 flex items-center justify-center"
        >
          <SafeGitHubImage
            src={langsUrl}
            alt="Top Languages"
            className="w-full max-w-md"
          />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-4 hover:border-white/10 transition-all duration-300 flex items-center justify-center md:col-span-2 lg:col-span-1"
        >
          <SafeGitHubImage
            src={streakUrl}
            alt="GitHub Streak"
            className="w-full max-w-md"
          />
        </motion.div>
      </motion.div>

      {/* Popular Repositories */}
      <motion.div variants={fadeInUp}>
        <h3 className="text-center text-white font-semibold text-lg mb-6">
          Popular Repositories
        </h3>
        <motion.div
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {POPULAR_REPOS.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </motion.div>
      </motion.div>

      {/* View Profile */}
      <motion.div variants={fadeInUp} className="text-center mt-10">
        <a
          href={personalInfo.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 hover:shadow-glow-sm transition-all duration-300"
        >
          <Github size={20} />
          View Full GitHub Profile
          <ExternalLink size={14} />
        </a>
      </motion.div>
    </SectionWrapper>
  );
}

export default memo(GitHubStats);
