import React, { memo } from "react";
import { motion } from "framer-motion";
import { cardHover } from "../animations/variants";

const glowMap = {
  blue: "hover:shadow-glow-sm",
  violet: "hover:shadow-glow-violet",
};

function AnimatedCard({
  children,
  className = "",
  glowColor = "blue",
  delay = 0,
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
      whileHover={cardHover.hover}
      className={`relative group bg-white/[0.03] md:backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden transition-[border-color,box-shadow] duration-300 ${glowMap[glowColor] || ""} ${className}`}
    >
      {/* Gradient border glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10" />
      </div>
      {children}
    </motion.div>
  );
}

export default memo(AnimatedCard);
