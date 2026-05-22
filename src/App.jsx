import { lazy, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";

// Lazy load sections for performance
const About = lazy(() => import("./sections/About"));
const Skills = lazy(() => import("./sections/Skills"));
const Projects = lazy(() => import("./sections/Projects"));
const Experience = lazy(() => import("./sections/Experience"));
const Achievements = lazy(() => import("./sections/Achievements"));
const GitHubStats = lazy(() => import("./sections/GitHub"));
const Contact = lazy(() => import("./sections/Contact"));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    let lenisInstance = null;
    let rafId = null;

    const initLenis = async () => {
      try {
        const Lenis = (await import("@studio-freight/lenis")).default;
        lenisInstance = new Lenis({
          lerp: 0.1,
          smoothWheel: true,
        });

        window.lenis = lenisInstance;

        const raf = (time) => {
          lenisInstance?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch (e) {
        // Lenis is optional, fallback to native scrolling
        console.log("Lenis not available, using native scrolling");
      }
    };

    initLenis();

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
        window.lenis = null;
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-950">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Achievements />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <GitHubStats />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
