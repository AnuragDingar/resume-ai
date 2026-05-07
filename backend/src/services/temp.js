const resume = {
  metadata: {
    profile_id: "profile_001",
    created_date: "2024-04-28",
    years_of_experience: 4,
  },
  personal_info: {
    name: "Rahul Sharma",
    title: "Full Stack Engineer · MERN Developer · AI/GenAI Specialist",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    linkedin: "https://linkedin.com/in/rahulsharma",
    github: "https://github.com/rahulsharma",
    location: "Bengaluru, India",
  },
  experience: [
    {
      id: "exp_001",
      position: 1,
      job_title: "Senior Software Engineer",
      company: "TechNova Solutions",
      location: "Bengaluru, India",
      start_date: "2023-01-01",
      end_date: "present",
      duration_years: 2,
      key_metrics: [
        "Reduced customer support resolution time by 40%",
        "Handled 500K+ daily API requests with 99.9% uptime",
        "Improved user engagement metrics by 28%",
      ],
      responsibilities: [
        "Led development of an AI-powered customer support platform integrating OpenAI GPT-4 and LangChain, reducing resolution time by 40%.",
        "Built and maintained RESTful APIs using Node.js and Express, serving 500K+ daily requests with 99.9% uptime.",
        "Architected a RAG pipeline using Pinecone vector DB and OpenAI embeddings for intelligent document search.",
        "Developed responsive React dashboards with Redux Toolkit, improving user engagement by 28%.",
        "Mentored 2 junior developers and conducted code reviews.",
      ],
      technologies: [
        "Node.js",
        "Express",
        "React",
        "Redux Toolkit",
        "OpenAI API",
        "LangChain",
        "Pinecone",
        "MongoDB",
      ],
    },
    {
      id: "exp_002",
      position: 2,
      job_title: "Full Stack Developer (MERN)",
      company: "CloudPixel Technologies",
      location: "Hyderabad, India",
      start_date: "2021-07-01",
      end_date: "2022-12-31",
      duration_years: 1.5,
      key_metrics: [
        "Reduced API response times by 35%",
        "Implemented CI/CD pipelines",
        "Scaled to handle peak traffic",
      ],
      responsibilities: [
        "Built end-to-end features for a SaaS e-commerce platform using React, Node.js, Express, and MongoDB.",
        "Integrated third-party APIs including Razorpay, Firebase Auth, and Twilio.",
        "Implemented CI/CD pipelines using GitHub Actions and deployed to AWS EC2 and S3.",
        "Optimized MongoDB queries and added indexing, reducing API response times by 35%.",
        "Developed real-time features using Socket.io for order tracking and notifications.",
      ],
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io",
        "AWS",
        "GitHub Actions",
        "Razorpay",
      ],
    },
    {
      id: "exp_003",
      position: 3,
      job_title: "Junior Web Developer",
      company: "Webcraft Studios",
      location: "Pune, India",
      start_date: "2020-06-01",
      end_date: "2021-06-30",
      duration_years: 1,
      responsibilities: [
        "Developed frontend features using React.js and Tailwind CSS for client projects.",
        "Built REST APIs with Node.js/Express and integrated MySQL and MongoDB databases.",
        "Collaborated with UI/UX designers to convert Figma designs into pixel-perfect components.",
      ],
      technologies: [
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "MySQL",
        "MongoDB",
        "Figma",
      ],
    },
  ],
  skills: {
    frontend: [
      "React.js",
      "Next.js",
      "Redux Toolkit",
      "TypeScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "GraphQL",
      "Socket.io",
      "PostgreSQL",
    ],
    ai_genai: [
      "LangChain",
      "OpenAI API",
      "RAG Pipelines",
      "Pinecone",
      "Prompt Engineering",
      "Hugging Face",
    ],
    tools_devops: [
      "Git / GitHub",
      "Docker",
      "AWS (EC2, S3)",
      "GitHub Actions",
      "Postman",
      "Jira",
    ],
  },
  projects: [
    {
      id: "proj_001",
      name: "AI Doc Assistant",
      description:
        "RAG-based document Q&A system using LangChain, Pinecone, and GPT-4.",
      technologies: ["LangChain", "Pinecone", "OpenAI API", "React", "Node.js"],
      key_features: [
        "PDF ingestion",
        "Semantic search",
        "RAG pipeline",
        "Real-time responses",
      ],
    },
    {
      id: "proj_002",
      name: "MERN E-Commerce Platform",
      description:
        "Full-featured SaaS e-commerce app with payments, real-time tracking, and analytics.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io",
        "Razorpay",
      ],
      key_features: [
        "Cart management",
        "Razorpay payments",
        "Real-time tracking",
        "Admin dashboard",
      ],
    },
    {
      id: "proj_003",
      name: "GenAI Content Generator",
      description:
        "Next.js app for auto-generating marketing copy using OpenAI API.",
      technologies: ["Next.js", "OpenAI API", "React", "TypeScript"],
      key_features: [
        "AI content generation",
        "Tone customization",
        "History",
        "Export options",
      ],
    },
    {
      id: "proj_004",
      name: "Real-Time Chat App",
      description:
        "Socket.io-based group chat with JWT auth and message history.",
      technologies: ["Socket.io", "React", "Node.js", "MongoDB", "JWT"],
      key_features: [
        "Real-time messaging",
        "JWT auth",
        "Message history",
        "Online presence",
      ],
    },
  ],
  education: [
    {
      degree: "B.E. Computer Science",
      institution: "Pune University",
      graduation_year: 2020,
    },
  ],
  certifications: [
    {
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
      issue_date: "2023-06",
    },
    {
      name: "Meta React Developer Certificate",
      issuer: "Meta",
      issue_date: "2023-03",
    },
    {
      name: "DeepLearning.AI LangChain Course",
      issuer: "DeepLearning.AI",
      issue_date: "2023-11",
    },
  ],
};

const jobDescription = {
  id: "job_match_001",
  match_score: 95,
  match_status: "EXCELLENT_FIT",
  job_title: "Senior Full Stack Engineer (MERN + AI)",
  company: "TechForward Inc.",
  location: "Bengaluru, India",
  description:
    "Build AI-powered SaaS tools using MERN stack and Generative AI.",
  required_skills: [
    "MERN Stack",
    "LangChain",
    "OpenAI API",
    "Vector Databases",
    "AWS",
    "Docker",
    "TypeScript",
  ],
  why_match: {
    experience: "4 years vs 3-5 required - Perfect match",
    stack: "MERN expertise directly matches requirements",
    ai_skills: "LangChain, OpenAI, RAG pipeline experience",
    tools: "AWS, Docker, GitHub Actions in profile",
    soft_skills: "Mentoring experience matches team lead role",
  },
};

const nonMatchingJobDescription = {
  id: "job_non_match_001",
  match_score: 2,
  match_status: "POOR_FIT",
  job_title: "Embedded Systems Engineer (C/C++)",
  company: "AutoDrive Systems",
  location: "Pune, India",
  description: "Develop firmware for safety-critical vehicle control units.",
  required_skills: [
    "C/C++",
    "RTOS",
    "ARM Cortex-M",
    "CAN Bus",
    "ISO 26262",
    "AUTOSAR",
  ],
  why_not_match: {
    language: "Profile: JavaScript/Web | Job: C/C++ firmware",
    domain: "Profile: Web apps | Job: Embedded systems",
    hardware: "Profile: Web development | Job: Microcontroller programming",
    standards: "Profile: Web standards | Job: Automotive safety standards",
  },
};

const selfDescription = {
    id: "self_desc_001",
    text: "I'm a Full Stack Engineer with 4 years of experience building scalable web applications and AI-powered products. My core stack is MERN (MongoDB, Express, React, Node.js), and over the past couple of years I've been deeply involved in integrating Generative AI into real-world applications — from RAG pipelines and LLM APIs to intelligent search and content generation tools. I enjoy working across the full product lifecycle — from designing APIs and database schemas to shipping polished React UIs. I care about writing clean, maintainable code and building things that actually solve problems for users. Recently I've been focused on the intersection of web development and AI, exploring how tools like LangChain, OpenAI, and vector databases can be embedded into everyday products to make them smarter and more useful. Outside of work, I contribute to open source, keep up with the AI space, and occasionally write about things I'm learning."
};

module.exports = {
  resume,
  jobDescription,
  nonMatchingJobDescription,
  selfDescription,
};
