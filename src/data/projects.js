export const projects = [
  {
    id: 1,
    title: "Smart Attendance System",
    description:
      "Touchless face-recognition attendance system with real-time dashboards and automated record management.",
    longDescription:
      "A comprehensive face-recognition based attendance system that eliminates manual roll calls. Features include real-time attendance dashboards, automated record management, role-based authentication for admins and students, and REST API integration for seamless data flow. Built with Django and Python's face_recognition library.",
    tech: ["Python", "Django", "Face Recognition", "REST APIs", "SQLite", "Role-based Auth"],
    github: "https://github.com/Gangadhar-tech-coder",
    category: "AI/ML + Full Stack",
    featured: true,
    gradient: "from-blue-600 via-cyan-500 to-teal-400",
    icon: "attendance",
  },
  {
    id: 2,
    title: "Speech Emotion Recognition",
    description:
      "Deep learning system analyzing RAVDESS dataset (8 emotions). Evaluated SVM, MLP, CNN — CNN achieved 92% accuracy.",
    longDescription:
      "An advanced deep learning project for recognizing emotions from speech audio. Trained and compared three architectures — SVM, MLP, and CNN — on the RAVDESS dataset covering 8 distinct emotions. The CNN model achieved the highest accuracy of 92%, demonstrating superior performance in audio feature extraction and classification.",
    tech: ["Python", "CNN", "SVM", "MLP", "RAVDESS Dataset", "Scikit-learn", "Deep Learning"],
    github: "https://github.com/Gangadhar-tech-coder",
    category: "AI/ML",
    featured: true,
    gradient: "from-violet-600 via-purple-500 to-fuchsia-400",
    icon: "speech",
  },
  {
    id: 3,
    title: "Student Expense Tracker",
    description:
      "App to track daily expenses and visualize monthly spending with interactive charts.",
    longDescription:
      "A user-friendly application designed for students to manage their finances efficiently. Features include daily expense logging, categorized spending, and interactive Matplotlib charts for visualizing monthly spending patterns. Provides insights to help students make better financial decisions.",
    tech: ["Python", "Matplotlib", "GUI"],
    github: "https://github.com/Gangadhar-tech-coder/student-expense-tracker",
    category: "Python",
    featured: false,
    gradient: "from-emerald-600 via-green-500 to-lime-400",
    icon: "expense",
  },
  {
    id: 4,
    title: "Vehicle Price Prediction",
    description:
      "Regression analysis to predict vehicle resale prices from technical specs.",
    longDescription:
      "A machine learning project that predicts vehicle resale prices using regression analysis on technical specifications. Features data preprocessing, feature engineering, and model evaluation with multiple regression algorithms to find the best predictor for vehicle pricing.",
    tech: ["Python", "Scikit-learn", "Regression", "Data Analysis"],
    github: "https://github.com/Gangadhar-tech-coder/Vehicle-Price-Prediction",
    category: "AI/ML",
    featured: false,
    gradient: "from-orange-600 via-amber-500 to-yellow-400",
    icon: "vehicle",
  },
  {
    id: 5,
    title: "Mobile Price Prediction",
    description:
      "ML classification model predicting mobile price range from features.",
    longDescription:
      "A classification-based machine learning project that predicts the price range of mobile phones based on their specifications and features. Implements multiple ML classifiers and evaluates performance using accuracy, precision, recall, and F1-score metrics.",
    tech: ["Python", "Scikit-learn", "ML Classification"],
    github: "https://github.com/Gangadhar-tech-coder/Mobile-Price-Prediction",
    category: "AI/ML",
    featured: false,
    gradient: "from-pink-600 via-rose-500 to-red-400",
    icon: "mobile",
  },
  {
    id: 6,
    title: "Hospital Management System",
    description:
      "GUI app for hospital records, appointments, and billing management.",
    longDescription:
      "A comprehensive hospital management GUI application built with Python and Tkinter. Features include patient record management, appointment scheduling, billing and invoice generation, and database-backed storage for reliable data persistence.",
    tech: ["Python", "Tkinter", "Database"],
    github: "https://github.com/Gangadhar-tech-coder/Hospital-Management",
    category: "Python",
    featured: false,
    gradient: "from-sky-600 via-blue-500 to-indigo-400",
    icon: "hospital",
  },
  {
    id: 7,
    title: "SkillSwap",
    description:
      "A peer-to-peer skill exchange platform where users can offer and request skills, enabling community-driven learning without money. Built with real-time matching and user profiles.",
    longDescription:
      "A peer-to-peer skill exchange platform where users can offer and request skills, enabling community-driven learning without money. Features include a peer-to-peer skill matching system, real-time request/offer management, user profiles with skill badges, and a robust Django backend with a React frontend.",
    tech: ["Python", "Django", "React", "REST APIs", "PostgreSQL"],
    github: "https://github.com/Gangadhar-tech-coder/skillswap",
    category: "Full Stack",
    featured: true,
    gradient: "from-indigo-600 via-purple-500 to-pink-400",
    icon: "skillswap",
    highlights: [
      "Peer-to-peer skill matching system",
      "Real-time request/offer management",
      "User profiles with skill badges",
      "Django backend with React frontend"
    ]
  },
  {
    id: 8,
    title: "ASAP",
    description:
      "ASAP is a fast task/service delivery platform built to connect users who need things done quickly with available helpers nearby. Focused on speed, simplicity, and real-time updates.",
    longDescription:
      "ASAP is a fast task/service delivery platform built to connect users who need things done quickly with available helpers nearby. Focused on speed, simplicity, and real-time updates, the platform features real-time task broadcasting, fast API response design, location-based service matching, and a clean minimal UI.",
    tech: ["Python", "Django", "FastAPI", "REST APIs", "SQLite"],
    github: "https://github.com/Gangadhar-tech-coder/asap",
    category: "Full Stack",
    featured: true,
    gradient: "from-amber-500 via-red-500 to-rose-600",
    icon: "asap",
    highlights: [
      "Real-time task broadcasting",
      "Fast API response design",
      "Location-based service matching",
      "Clean minimal UI"
    ]
  },
  {
    id: 9,
    title: "Car Rental System",
    description:
      "A complete car rental web application with booking management, vehicle listings, availability tracking, admin dashboard, and user authentication.",
    longDescription:
      "A complete car rental web application featuring vehicle listings with filters and availability tracking, a booking flow with date range selection, a role-based admin panel, and user authentication with booking history.",
    tech: ["Python", "Django", "SQLite", "Bootstrap", "REST APIs"],
    github: "https://github.com/Gangadhar-tech-coder/car-rental-system",
    category: "Full Stack",
    featured: false,
    gradient: "from-blue-600 via-indigo-500 to-purple-600",
    icon: "carrental",
    highlights: [
      "Car listing with filters and availability",
      "Booking flow with date range selection",
      "Role-based admin panel",
      "User authentication and booking history"
    ]
  }
];
