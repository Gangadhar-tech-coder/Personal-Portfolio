import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { Download, Eye, ChevronDown } from "lucide-react";
import { Github, Linkedin } from "../components/Icons";
import { personalInfo } from "../data/personalInfo";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "../animations/variants";

/* ───── Check mobile once ───── */
const getIsMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

/* ───── Particle positions (stable across renders) ───── */
const PARTICLE_COUNT_DESKTOP = 20;
const PARTICLE_COUNT_MOBILE = 0;
const particlePositions = Array.from({ length: PARTICLE_COUNT_DESKTOP }).map(() => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 5,
}));

/* ───── Animated grid background ───── */
const GridBackground = memo(function GridBackground() {
  const isMobile = useMemo(getIsMobile, []);
  const particles = isMobile ? [] : particlePositions;

  if (isMobile) {
    // Simple CSS-only gradient on mobile — no animated orbs or particles
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Static orbs without animation for mobile */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-violet-500/10 rounded-full blur-[120px]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs — will-change for GPU acceleration */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"
        style={{ willChange: "transform" }}
      />
      <motion.div
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[120px]"
        style={{ willChange: "transform" }}
      />
      <motion.div
        animate={{
          x: [0, 20, -30, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-[100px]"
        style={{ willChange: "transform" }}
      />

      {/* Particle dots (capped at 20 on desktop, 0 on mobile) */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{ top: p.top, left: p.left, willChange: "transform, opacity" }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
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

  return (
    <motion.div
      variants={fadeInRight}
      className="relative flex items-center justify-center"
    >
      {/* Animated rings — simpler on mobile */}
      {!isMobile && (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full border border-blue-500/20"
            style={{ willChange: "transform" }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-80 h-80 sm:w-88 sm:h-88 lg:w-[420px] lg:h-[420px] rounded-full border border-violet-500/10"
            style={{ willChange: "transform" }}
          />
        </>
      )}

      {/* Static rings fallback on mobile */}
      {isMobile && (
        <>
          <div className="absolute w-72 h-72 rounded-full border border-blue-500/20" />
          <div className="absolute w-80 h-80 rounded-full border border-violet-500/10" />
        </>
      )}

      {/* Glowing orb behind avatar */}
      <div className="absolute w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-full blur-3xl" />

      {/* Avatar circle */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-white/10 shadow-glow-md"
        style={{ willChange: "transform" }}
      >
        <div className="w-full h-full bg-gradient-to-br from-blue-600/30 via-violet-600/20 to-cyan-600/30 flex items-center justify-center">
          <span className="text-6xl sm:text-7xl lg:text-8xl font-display font-bold text-white/90">
            G
          </span>
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        className="absolute -top-2 right-4 lg:right-8 px-3 py-1.5 bg-blue-500/20 md:backdrop-blur-sm border border-blue-500/30 rounded-full text-xs font-medium text-blue-300"
        style={{ willChange: "transform" }}
      >
        🐍 Python
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute bottom-4 -left-2 lg:left-2 px-3 py-1.5 bg-violet-500/20 md:backdrop-blur-sm border border-violet-500/30 rounded-full text-xs font-medium text-violet-300"
        style={{ willChange: "transform" }}
      >
        🤖 AI/ML
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-16 -right-4 lg:right-0 px-3 py-1.5 bg-cyan-500/20 md:backdrop-blur-sm border border-cyan-500/30 rounded-full text-xs font-medium text-cyan-300"
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
