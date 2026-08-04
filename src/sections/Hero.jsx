import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { Download, Eye, ChevronDown } from "lucide-react";
import { Github, Linkedin } from "../components/Icons";
import { personalInfo } from "../data/personalInfo";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "../animations/variants";

/* ───── Check mobile once ───── */
const getIsMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

/* ───── Particle / Star positions (stable across renders) ───── */
const starPositions = Array.from({ length: 35 }).map(() => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: 1 + Math.random() * 1.5,
  duration: 10 + Math.random() * 15,
  delay: Math.random() * -15,
  yOffset: -(60 + Math.random() * 100),
}));

/* ───── Animated grid background ───── */
const GridBackground = memo(function GridBackground() {
  const isMobile = useMemo(getIsMobile, []);
  const stars = isMobile ? [] : starPositions;

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        background: "radial-gradient(circle at center, #050814 0%, #010205 100%)",
      }}
    >
      {/* 3D scrolling grid perspective effect (ambient Tron grid) */}
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none overflow-hidden"
          style={{
            perspective: "500px",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            animate={{
              backgroundPositionY: ["0px", "100px"],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 origin-top"
            style={{
              backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.25) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(6, 182, 212, 0.25) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              transform: "rotateX(60deg) scale(2.5) translateY(-30%)",
              height: "200%",
            }}
          />
        </div>
      )}

      {/* Ambient Deep Glow Orbs */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-blue-900/10 rounded-full blur-[140px]"
        style={{ willChange: "transform" }}
      />
      <motion.div
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-950/15 rounded-full blur-[140px]"
        style={{ willChange: "transform" }}
      />
      <motion.div
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-cyan-950/10 rounded-full blur-[120px]"
        style={{ willChange: "transform" }}
      />

      {/* Drifting Cyber Dust / Starfield */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400/40 shadow-[0_0_4px_rgba(34,211,238,0.4)]"
          style={{ 
            top: star.top, 
            left: star.left, 
            width: star.size, 
            height: star.size,
            willChange: "transform, opacity" 
          }}
          animate={{ 
            y: [0, star.yOffset],
            opacity: [0, 0.8, 0.8, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: star.duration, 
            repeat: Infinity, 
            delay: star.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
});

/* ───── Typewriter component ───── */
const TypewriterText = memo(function TypewriterText({ texts, speed = 100, pause = 2000 }) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout;

    if (!isDeleting && charIndex < currentText.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((t) => (t + 1) % texts.length);
    }

    setDisplayText(currentText.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, pause]);

  return (
    <span>
      {displayText}
      <span className="inline-block w-[3px] h-[1em] bg-blue-400 ml-1 animate-pulse align-middle" />
    </span>
  );
});

/* ───── Profile avatar ───── */
const ProfileAvatar = memo(function ProfileAvatar() {
  const isMobile = useMemo(getIsMobile, []);
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (isMobile) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    // Max tilt 12 degrees
    const tiltX = (y / (box.height / 2)) * -12;
    const tiltY = (x / (box.width / 2)) * 12;
    setTilt({ x: tiltX, y: tiltY });
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      variants={fadeInRight}
      className="relative flex items-center justify-center cursor-pointer select-none"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => !isMobile && setIsFlipped(true)}
      onMouseLeave={() => {
        if (!isMobile) {
          setIsFlipped(false);
          handleMouseLeave();
        }
      }}
    >
      {/* Animated Orbiting Rings — Simpler on mobile */}
      {!isMobile && (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full border border-dashed border-blue-500/20"
            style={{ willChange: "transform" }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute w-80 h-80 sm:w-88 sm:h-88 lg:w-[420px] lg:h-[420px] rounded-full border border-violet-500/10"
            style={{ willChange: "transform" }}
          />
          {/* Orbital glowing nodes */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-88 h-88 sm:w-96 sm:h-96 lg:w-[440px] lg:h-[440px] rounded-full"
            style={{ willChange: "transform" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_10px_#a78bfa]" />
          </motion.div>
        </>
      )}

      {/* Glowing background aura */}
      <div className="absolute w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-violet-500/25 rounded-full blur-[100px] pointer-events-none" />

      {/* 3D Flip Card Container */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 transition-transform duration-500"
        style={{
          perspective: "1200px",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* FACE A: Glowing Innovative "G" */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl border border-white/10 bg-gradient-to-br from-dark-900/90 via-blue-950/20 to-violet-950/40 backdrop-blur-md flex flex-col items-center justify-center p-6 shadow-2xl transition-colors duration-300 hover:border-blue-500/30"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Tech lines background inside card */}
          <div className="absolute inset-2 rounded-2xl border border-white/[0.03] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />
          
          {/* Corners decoration */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20" />
          
          <div className="absolute top-4 left-8 text-[8px] font-mono text-dark-300 tracking-widest">
            PORTFOLIO // SYSTEM
          </div>
          
          {/* Stunning Vector "G" logo */}
          <div className="relative z-10 flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36">
            <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400 filter drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
              {/* Outer circles */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3, 5" className="animate-spin" style={{ animationDuration: '40s', transformOrigin: 'center' }} />
              <circle cx="50" cy="50" r="41" fill="none" stroke="url(#g-glow-grad)" strokeWidth="1.5" strokeDasharray="30, 20" />
              
              {/* Bounding geometric diamond */}
              <path d="M 50,11 L 89,50 L 50,89 L 11,50 Z" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              
              {/* Stylized Neon G path */}
              <path 
                d="M 68,34 
                   A 22,22 0 1,0 68,66 
                   L 50,66 
                   L 50,52 
                   L 61,52" 
                fill="none" 
                stroke="url(#g-neon-grad)" 
                strokeWidth="7" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              
              {/* Core pulsing energy node */}
              <circle cx="50" cy="50" r="4" fill="#22d3ee" className="animate-ping" style={{ animationDuration: '2s', transformOrigin: 'center' }} />
              <circle cx="50" cy="50" r="3" fill="#22d3ee" />
              
              <defs>
                <linearGradient id="g-neon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <linearGradient id="g-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="mt-4 text-center z-10 font-display">
            <span className="text-[10px] font-mono tracking-[0.25em] text-cyan-400/80 uppercase font-semibold">
              GANGADHAR
            </span>
            <div className="text-[9px] font-mono text-dark-300 mt-1 tracking-wider">
              {isMobile ? "TAP TO REVEAL PHOTO" : "HOVER TO SCAN"}
            </div>
          </div>
        </div>

        {/* FACE B: High-Tech Profile Scanner */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl border border-cyan-500/30 bg-dark-950 flex flex-col items-center justify-center p-5 shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Cybernetic details */}
          <div className="absolute inset-2 rounded-2xl border border-cyan-500/5 pointer-events-none" />
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

          {/* Telemetry data */}
          <div className="absolute top-4 left-6 text-[8px] font-mono text-cyan-400/60 tracking-wider">
            SYS_SCAN: READY
          </div>
          <div className="absolute top-4 right-6 text-[8px] font-mono text-cyan-400/60">
            8.83_CGPA
          </div>

          {/* Hologram Circle Frame */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-2 border-cyan-500/30 p-1.5 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:border-cyan-400 transition-colors duration-300">
            {/* Cyber grid pattern inside photo */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.08)_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none z-10 rounded-full" />
            
            {/* Laser Scanning Line */}
            <motion.div
              animate={{ y: [-10, 150, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_#06b6d4] z-20 pointer-events-none"
            />
            
            {/* Actual image */}
            <img
              src="/self.jpeg"
              alt="Gangadhar"
              className="w-full h-full object-cover rounded-full saturate-100 brightness-[1.05]"
              loading="lazy"
            />
          </div>

          <div className="mt-4 text-center font-display">
            <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-300 font-bold uppercase">
              SCAN COMPLETED
            </span>
            <div className="text-[9px] font-mono text-dark-300 mt-0.5">
              SEC_STATUS: SECURE_OK
            </div>
          </div>
        </div>
      </div>

      {/* Floating skill tags (existing icons but upgraded style) */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        className="absolute -top-3 right-0 lg:right-4 px-3.5 py-1.5 bg-blue-500/10 backdrop-blur-md border border-blue-500/20 rounded-full text-[11px] font-mono font-semibold text-blue-300 shadow-glow-sm"
        style={{ willChange: "transform" }}
      >
        🐍 Python
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute bottom-2 -left-4 lg:-left-2 px-3.5 py-1.5 bg-violet-500/10 backdrop-blur-md border border-violet-500/20 rounded-full text-[11px] font-mono font-semibold text-violet-300 shadow-glow-sm"
        style={{ willChange: "transform" }}
      >
        🤖 AI/ML
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-16 -right-4 lg:-right-2 px-3.5 py-1.5 bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 rounded-full text-[11px] font-mono font-semibold text-cyan-300 shadow-glow-sm"
        style={{ willChange: "transform" }}
      >
        ⚡ Django
      </motion.div>
    </motion.div>
  );
});

/* ───── Hero Section ───── */
export default function Hero() {
  const roles = useMemo(() => personalInfo.roles, []);

  const handleScrollDown = useCallback(() => {
    const target = document.getElementById("about");
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <GridBackground />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div variants={fadeInLeft}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInLeft}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight"
            >
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400">
                {personalInfo.displayName}
              </span>
            </motion.h1>

            <motion.div
              variants={fadeInLeft}
              className="text-xl sm:text-2xl lg:text-3xl font-medium text-dark-100 mb-6 h-10"
            >
              <TypewriterText texts={roles} />
            </motion.div>

            <motion.p
              variants={fadeInLeft}
              className="text-dark-200 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInLeft}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href={personalInfo.links.resume}
                download="Gangadhar_feb.pdf"
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold rounded-xl hover:shadow-glow-md transition-shadow duration-300 hover:scale-105"
              >
                <Download size={18} />
                Download Resume
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("projects");
                  if (target) {
                    if (window.lenis) {
                      window.lenis.scrollTo(target);
                    } else {
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/20 transition-colors duration-300 hover:scale-105"
              >
                <Eye size={18} />
                View Projects
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeInLeft}
              className="flex gap-3 mt-8 justify-center lg:justify-start"
            >
              <a
                href={personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-dark-200 hover:text-white hover:bg-white/10 hover:border-white/20 hover:shadow-glow-sm transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-dark-200 hover:text-white hover:bg-white/10 hover:border-white/20 hover:shadow-glow-sm transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </motion.div>
          </div>

          {/* Right: Avatar */}
          <div className="order-1 lg:order-2 flex justify-center">
            <ProfileAvatar />
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dark-300 hover:text-white transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
