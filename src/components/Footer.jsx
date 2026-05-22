import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";
import { Github, Linkedin, Instagram } from "./Icons";
import { personalInfo } from "../data/personalInfo";
import { NAV_LINKS } from "../utils/constants";

function Footer() {
  const scrollToTop = useCallback(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <footer className="relative bg-dark-950 border-t border-white/5">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center font-display font-bold text-white text-lg">
                GR
              </div>
              <span className="font-display font-bold text-white text-xl">
                {personalInfo.displayName}
              </span>
            </div>
            <p className="text-dark-200 text-sm leading-relaxed max-w-xs">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-dark-200 hover:text-blue-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-3 mb-4">
              <a
                href={personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-dark-200 hover:text-white hover:bg-white/10 hover:border-white/20 transition-[color,border-color,background-color] duration-300"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-dark-200 hover:text-white hover:bg-white/10 hover:border-white/20 transition-[color,border-color,background-color] duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={personalInfo.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-dark-200 hover:text-white hover:bg-white/10 hover:border-white/20 transition-[color,border-color,background-color] duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-dark-200 hover:text-blue-400 text-sm transition-colors"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-300 text-sm flex items-center gap-1">
            Built with <Heart size={14} className="text-red-500 fill-red-500" /> by{" "}
            <span className="text-white font-medium">{personalInfo.displayName}</span>{" "}
            · {new Date().getFullYear()}
          </p>

          <motion.button
            onClick={scrollToTop}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-dark-200 hover:text-white hover:bg-white/10 transition-[color,background-color] duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
