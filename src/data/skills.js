import {
  Code2,
  Brain,
  Server,
  Database,
  Wrench,
  Cloud,
} from "lucide-react";

export const skillCategories = [
  {
    id: "languages",
    title: "Languages",
    icon: Code2,
    skills: [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 80 },
      { name: "C", level: 75 },
      { name: "SQL", level: 85 },
      { name: "Java", level: 70 },
    ],
  },
  {
    id: "aiml",
    title: "AI / ML",
    icon: Brain,
    skills: [
      { name: "NumPy", level: 90 },
      { name: "Pandas", level: 90 },
      { name: "Matplotlib", level: 85 },
      { name: "Seaborn", level: 80 },
      { name: "Scikit-learn", level: 88 },
      { name: "CNN", level: 85 },
      { name: "SVM", level: 80 },
      { name: "MLP", level: 78 },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    icon: Server,
    skills: [
      { name: "Django", level: 92 },
      { name: "FastAPI", level: 80 },
      { name: "React", level: 78 },
      { name: "DRF", level: 88 },
      { name: "ORM", level: 85 },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: Database,
    skills: [
      { name: "MySQL", level: 85 },
      { name: "PostgreSQL", level: 82 },
      { name: "SQLite", level: 90 },
    ],
  },
  {
    id: "tools",
    title: "Developer Tools",
    icon: Wrench,
    skills: [
      { name: "Git", level: 88 },
      { name: "Docker", level: 72 },
      { name: "Postman", level: 85 },
      { name: "API Development", level: 90 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud / Other",
    icon: Cloud,
    skills: [
      { name: "AWS", level: 70 },
      { name: "Azure AI", level: 75 },
      { name: "REST APIs", level: 92 },
      { name: "Face Recognition", level: 80 },
    ],
  },
];
