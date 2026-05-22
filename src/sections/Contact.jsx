import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Github, Linkedin, Instagram } from "../components/Icons";
import SectionWrapper from "../components/SectionWrapper";
import { personalInfo } from "../data/personalInfo";
import { fadeInUp, fadeInLeft, fadeInRight } from "../animations/variants";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: "text-blue-400",
  },
  {
    icon: Phone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    color: "text-cyan-400",
  },
  {
    icon: MapPin,
    label: "Location",
    value: personalInfo.location,
    href: null,
    color: "text-violet-400",
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: personalInfo.links.github,
    color: "hover:text-white hover:border-white/20",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: personalInfo.links.linkedin,
    color: "hover:text-blue-400 hover:border-blue-500/30",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: personalInfo.links.instagram,
    color: "hover:text-pink-400 hover:border-pink-500/30",
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setTimeout(() => {
      setIsSending(false);
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <SectionWrapper
      id="contact"
      title="Get In Touch"
      subtitle="Have a project in mind? Let's build something amazing together"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
        {/* Left: Contact Info */}
        <motion.div variants={fadeInLeft}>
          <h3 className="text-2xl font-bold text-white font-display mb-6">
            Let's Connect
          </h3>
          <p className="text-dark-200 leading-relaxed mb-8">
            I'm always excited to collaborate on interesting projects, discuss AI/ML innovations, or explore new opportunities. Feel free to reach out!
          </p>

          {/* Contact Details */}
          <div className="space-y-4 mb-8">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              const content = (
                <div className="flex items-center gap-4 p-4 bg-white/[0.03] md:backdrop-blur-sm border border-white/[0.06] rounded-xl hover:border-white/10 transition-[border-color,box-shadow] duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className={detail.color} />
                  </div>
                  <div>
                    <p className="text-dark-300 text-xs">{detail.label}</p>
                    <p className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">
                      {detail.value}
                    </p>
                  </div>
                </div>
              );

              return detail.href ? (
                <a key={detail.label} href={detail.href}>
                  {content}
                </a>
              ) : (
                <div key={detail.label}>{content}</div>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-dark-200 transition-[color,border-color,background-color] duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  <Icon size={22} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div variants={fadeInRight}>
          <form
            onSubmit={handleSubmit}
            className="bg-white/[0.03] md:backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 sm:p-8"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-dark-100 mb-2"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-[border-color,box-shadow] duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-dark-100 mb-2"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-[border-color,box-shadow] duration-300"
                  placeholder="you@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-dark-100 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-[border-color,box-shadow] duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSending}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold rounded-xl hover:shadow-glow-md transition-[opacity,box-shadow] duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                {isSending ? "Sending..." : "Send Message"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

export default memo(Contact);
