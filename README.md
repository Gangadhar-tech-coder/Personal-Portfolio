# 🚀 Gangadhar Pulicharla — Personal Portfolio

A premium, production-ready personal portfolio website built with **React + Vite + Tailwind CSS + Framer Motion**.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

---

## ✨ Features

- 🎨 Premium dark theme with glassmorphism design
- ⚡ Smooth animations with Framer Motion
- 🔄 Typewriter rotating text effect
- 📊 Animated skill progress bars
- 🗓️ Interactive experience timeline
- 📈 GitHub stats integration
- 🏆 Achievement & certification showcase
- 📱 Fully responsive (375px → 2560px)
- 🚀 Lenis smooth scrolling
- 🔍 SEO optimized with meta tags
- ⚡ Code splitting with React.lazy

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📂 Project Structure

```
src/
├── animations/       → Framer Motion variants
├── assets/           → Static assets
├── components/       → Navbar, Footer, SectionWrapper, AnimatedCard
├── data/             → All editable content (personal info, skills, projects)
├── hooks/            → useScrollAnimation, useCountUp
├── sections/         → Hero, About, Skills, Projects, Experience, Achievements, GitHub, Contact
└── utils/            → Constants, helpers
```

---

## ✏️ How to Update Content

All content is centralized in `src/data/` files:

| File | Content |
|---|---|
| `personalInfo.js` | Name, email, phone, links, tagline, bio |
| `skills.js` | Categorized skill objects with proficiency levels |
| `projects.js` | All projects with descriptions, tech stacks, links |
| `experience.js` | Work experience timeline entries |
| `achievements.js` | Certifications and hackathon participation |

---

## 🚀 Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Vite — no config needed
4. Click **Deploy**

**Build Command:** `npm run build`  
**Output Directory:** `dist`

---

## 📄 License

MIT © Gangadhara Rao Pulicharla
