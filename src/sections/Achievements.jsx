import React, { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  Trophy, 
  ExternalLink, 
  X, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  Briefcase,
  Maximize2
} from "lucide-react";
import SectionWrapper from "../components/SectionWrapper";
import { achievements, achievementStats } from "../data/achievements";
import { personalInfo } from "../data/personalInfo";
import { useCountUp } from "../hooks/useCountUp";
import { fadeInUp, staggerContainer, scaleIn } from "../animations/variants";

const AchievementStat = memo(function AchievementStat({ stat }) {
  const [ref, count] = useCountUp(stat.value, 2000, 0);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      className="relative overflow-hidden group text-center p-6 bg-white/[0.02] backdrop-blur-md border border-white/[0.05] rounded-2xl hover:border-white/10 hover:shadow-glow-sm hover:bg-white/[0.04] transition-all duration-300"
    >
      <span className="text-3xl mb-2 block filter drop-shadow-sm">{stat.icon}</span>
      <div className="text-3xl sm:text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        {count}
        {stat.suffix || ""}
      </div>
      <div className="text-dark-200 text-sm mt-1 font-medium">{stat.label}</div>
    </motion.div>
  );
});

const AchievementCard = memo(function AchievementCard({ cert, onClick }) {
  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="group relative flex flex-col h-full bg-white/[0.02] backdrop-blur-md border border-white/[0.05] rounded-2xl overflow-hidden hover:border-white/10 hover:shadow-glow-sm transition-all duration-300 cursor-pointer"
    >
      {/* Light glow overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`} />

      {/* Image Preview Container (Medium Display) */}
      <div className="relative h-48 w-full overflow-hidden bg-dark-900 flex-shrink-0 border-b border-white/[0.04] select-none">
        <img
          src={cert.image}
          alt={cert.title}
          draggable={false}
          onContextMenu={handleContextMenu}
          className="w-full h-full object-cover transition-all duration-700 ease-out saturate-[0.8] brightness-[0.95] group-hover:scale-110 group-hover:saturate-100 group-hover:brightness-105 pointer-events-none"
          loading="lazy"
        />
        
        {/* Soft shadow gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent pointer-events-none" />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-2xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {cert.icon}
          </span>
          <span className={`px-2.5 py-0.5 bg-gradient-to-r ${cert.color} text-white text-[10px] font-bold tracking-wider rounded-full shadow-md uppercase`}>
            {cert.badge}
          </span>
        </div>

        {/* Hover magnifier icon */}
        <div className="absolute inset-0 bg-dark-950/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="p-3 rounded-full bg-white/10 border border-white/20 text-white shadow-lg"
          >
            <Maximize2 size={20} />
          </motion.div>
        </div>
      </div>

      {/* Text Info */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[10px] font-mono font-semibold text-cyan-400 tracking-wider uppercase mb-1 block">
            {cert.type}
          </span>
          <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
            {cert.title}
          </h4>
        </div>
        <p className="text-dark-300 text-xs mt-2 border-t border-white/[0.04] pt-2">
          {cert.issuer}
        </p>
      </div>
    </motion.div>
  );
});

function Achievements() {
  const [lightboxData, setLightboxData] = useState({ list: [], index: null });
  const [zoomScale, setZoomScale] = useState(1);

  // Group achievements statically
  const certsList = useMemo(() => achievements.filter((a) => a.type === "certification"), []);
  const hackathonsList = useMemo(() => achievements.filter((a) => a.type === "hackathon"), []);
  const internshipsList = useMemo(() => achievements.filter((a) => a.type === "internship"), []);

  const selectedCert = useMemo(() => {
    if (lightboxData.index === null || !lightboxData.list.length) return null;
    return lightboxData.list[lightboxData.index];
  }, [lightboxData]);

  const handleOpenLightbox = useCallback((list, index) => {
    setLightboxData({ list, index });
    setZoomScale(1);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxData({ list: [], index: null });
    setZoomScale(1);
  }, []);

  const handlePrev = useCallback((e) => {
    e.stopPropagation();
    setLightboxData((prev) => ({
      ...prev,
      index: prev.index === 0 ? prev.list.length - 1 : prev.index - 1
    }));
    setZoomScale(1);
  }, []);

  const handleNext = useCallback((e) => {
    e.stopPropagation();
    setLightboxData((prev) => ({
      ...prev,
      index: prev.index === prev.list.length - 1 ? 0 : prev.index + 1
    }));
    setZoomScale(1);
  }, []);

  const handleZoomIn = useCallback((e) => {
    e.stopPropagation();
    setZoomScale((prev) => Math.min(prev + 0.25, 2.5));
  }, []);

  const handleZoomOut = useCallback((e) => {
    e.stopPropagation();
    setZoomScale((prev) => Math.max(prev - 0.25, 0.75));
  }, []);

  const handleResetZoom = useCallback((e) => {
    e.stopPropagation();
    setZoomScale(1);
  }, []);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <div className="relative">
      {/* 1. Licenses & Certifications Section */}
      <SectionWrapper
        id="achievements"
        title="Licenses & Certifications"
        subtitle="Technical credentials and certifications earned in professional fields"
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

        {/* Certifications Grid */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {certsList.map((item, index) => (
            <AchievementCard
              key={item.id}
              cert={item}
              onClick={() => handleOpenLightbox(certsList, index)}
            />
          ))}
        </motion.div>
      </SectionWrapper>

      {/* 2. Hackathons & Competitions Section */}
      <SectionWrapper
        id="hackathons"
        title="Hackathons & Competitions"
        subtitle="Challenging development sprints, coding hackathons, and design contests"
        className="bg-white/[0.01]"
      >
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {hackathonsList.map((item, index) => (
            <AchievementCard
              key={item.id}
              cert={item}
              onClick={() => handleOpenLightbox(hackathonsList, index)}
            />
          ))}
        </motion.div>
      </SectionWrapper>

      {/* 3. Internship Certificates Section */}
      <SectionWrapper
        id="internships"
        title="Internship Certificates"
        subtitle="Industrial credentials, work certifications, and internship completions"
      >
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto gap-6 justify-center"
        >
          {internshipsList.map((item, index) => (
            <AchievementCard
              key={item.id}
              cert={item}
              onClick={() => handleOpenLightbox(internshipsList, index)}
            />
          ))}
        </motion.div>
      </SectionWrapper>

      {/* Unified Google Drive Link */}
      <div className="text-center py-10 pb-20">
        <a
          href={personalInfo.links.certificates}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20 rounded-xl text-blue-400 font-medium hover:bg-blue-500/20 hover:shadow-glow-sm hover:scale-105 transition-all duration-300"
        >
          <Award size={18} />
          View All Credentials on Google Drive
          <ExternalLink size={14} />
        </a>
      </div>

      {/* LIGHTBOX MODAL VIEWER (SECURE - NO DOWNLOAD) */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-between p-4 bg-dark-950/95 backdrop-blur-md select-none"
            onClick={handleCloseLightbox}
          >
            {/* Top Bar Controls (SECURE: NO DOWNLOAD OPTION) */}
            <div className="w-full flex items-center justify-between max-w-7xl mx-auto py-2 z-10">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  {selectedCert.type}
                </span>
                <span className="text-white font-bold text-sm sm:text-base line-clamp-1">
                  {selectedCert.title}
                </span>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
                {/* Zoom In */}
                <button
                  onClick={handleZoomIn}
                  className="p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/10 text-dark-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={18} />
                </button>
                {/* Zoom Out */}
                <button
                  onClick={handleZoomOut}
                  className="p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/10 text-dark-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={18} />
                </button>
                {/* Reset Zoom */}
                <button
                  onClick={handleResetZoom}
                  className="p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/10 text-dark-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw size={18} />
                </button>
                {/* Close */}
                <button
                  onClick={handleCloseLightbox}
                  className="p-2 sm:p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:text-white hover:bg-red-500 transition-colors cursor-pointer"
                  title="Close Viewer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Middle Slider Container */}
            <div className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center overflow-hidden py-4">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-10 p-3 sm:p-4 rounded-full bg-white/5 border border-white/10 text-dark-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shadow-lg"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Certificate Image Frame */}
              <div 
                className="w-full h-full max-h-[70vh] flex items-center justify-center overflow-auto p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  key={selectedCert.id}
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  style={{ scale: zoomScale }}
                  className="transition-transform duration-200 ease-out origin-center max-w-full max-h-full"
                >
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    draggable={false}
                    onContextMenu={handleContextMenu}
                    className="max-w-full max-h-[68vh] object-contain rounded-lg border border-white/10 shadow-2xl bg-dark-900 pointer-events-none select-none"
                  />
                </motion.div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-10 p-3 sm:p-4 rounded-full bg-white/5 border border-white/10 text-dark-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shadow-lg"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom details card */}
            <div 
              className="w-full max-w-3xl mx-auto mb-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl flex items-center justify-between gap-4 backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1">
                <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase tracking-wider block mb-1">
                  Issued by
                </span>
                <p className="text-white text-sm font-semibold">{selectedCert.issuer}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">{selectedCert.icon}</span>
                <span className="text-xs text-dark-300 font-mono">
                  {lightboxData.index + 1} / {lightboxData.list.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(Achievements);
