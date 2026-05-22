import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "../animations/variants";

export default function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  className = "",
  fullWidth = false,
}) {
  return (
    <section id={id} className={`relative py-20 lg:py-32 ${className}`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className={fullWidth ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}
      >
        {title && (
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {title}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                .
              </span>
            </h2>
            {subtitle && (
              <p className="text-dark-200 text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
            <div className="mt-6 flex justify-center">
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
            </div>
          </motion.div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
