export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

export const getRandomDelay = (min = 0, max = 0.5) => {
  return Math.random() * (max - min) + min;
};

export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};
