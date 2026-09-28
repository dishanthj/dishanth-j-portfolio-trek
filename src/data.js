// EDIT THIS FILE: everything on the site comes from here.
export const me = {
  name: "Dishanth J",
  role: "Java Full Stack Developer · Class of 2026",
  email: "dishanthj23@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/dishanthj" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dishanth-j" },
    { label: "Resume (PDF)", href: "resume.pdf" },
  ],
};

export const camps = [
  {
    id: "base", name: "Base Camp", elevation: 0,
    photo: "me.png",
    photoAlt: "Dishanth J",
    title: "Hi, I'm Dishanth J.",
    body: [
      "I'm a Computer Science graduate who builds backend and full-stack applications with Java, Spring Boot, REST APIs and SQL. I also work with AI and machine learning, and I enjoy using them to build intelligent, practical software.",
      "Scroll to start the climb: the higher you go, the more you'll learn about me.",
    ],
    stats: [
      { value: "2026", label: "Graduate" },
      { value: "3+", label: "Projects" },
      { value: "Java", label: "Primary skill" },
    ],
  },
  {
    id: "about", name: "Camp 1: The Trailhead", elevation: 1000,
    title: "Where I come from",
    body: ["I graduated in 2026 with a B.E. in Computer Science and Engineering. This is the path that brought me here."],
    timeline: [
      { title: "B.E. in Computer Science and Engineering (VTU)", place: "ATME College of Engineering", when: "2022 – 2026", text: "CGPA: 7.8" },
      { title: "12th (PUC)", place: "GSI PU College, Mysore", when: "2021 – 2022", text: "Score: 78%" },
      { title: "10th (CBSE)", place: "Kendriya Vidyalaya Mysore", when: "2019 – 2020", text: "Score: 64%" },
    ],
  },
  {
    id: "skills", name: "Camp 2: The Gear", elevation: 2000,
    title: "What I carry",
    skills: [
      { group: "Languages", items: ["Java", "Python", "C", "C++"] },
      { group: "Frameworks", items: ["Spring Boot", "Spring MVC", "Spring Data JPA", "Hibernate", "React JS"] },
      { group: "Web", items: ["HTML5", "CSS3", "JavaScript"] },
      { group: "APIs", items: ["REST APIs", "JDBC", "Servlets", "JSP", "JPA"] },
      { group: "Databases", items: ["MySQL", "PostgreSQL", "Oracle SQL"] },
      { group: "AI & ML", items: ["YOLO", "Data Science with Python"] },
      { group: "Tools", items: ["Git", "GitHub", "IntelliJ IDEA", "Eclipse", "VS Code", "STS", "Postman"] },
    ],
  },
  {
    id: "projects", name: "Camp 3: The Ridge", elevation: 3000,
    title: "Things I've built",
    projects: [
      {
        name: "Job Application Tracking System",
        text: "A web-based job portal with separate Admin and Job Seeker workflows, built with Java, Spring MVC, JSP, Hibernate/JPA, PostgreSQL and JPQL. It includes JWT-based authentication, role-based access control, job and company management, job search, applications and application-status tracking.",
        stack: "Java 17 · Spring MVC · JSP · Hibernate · JPA/JPQL · PostgreSQL · JWT · Lombok · Maven · Tomcat",
        href: "https://github.com/dishanthj/Job-Tracking-Application",
      },
      {
        name: "Fire Safety IoT System",
        text: "An IoT-based fire detection system that uses YOLO, ESP32 sensors and a Flask REST backend to detect fire hazards and classify fire types. I trained a custom YOLO model on 1,200+ labelled images, reaching 83% fire-detection accuracy, and built a Flutter app for real-time hazard alerts and extinguisher guidance.",
        stack: "Python · YOLO · Flask · Flutter · ESP32 · MongoDB · REST APIs",
        href: "https://github.com/Harshith-richards/Fire-Safety-System",   // replace with the repo link once it's public
      },
      {
        name: "Facial Emotion Detection",
        text: "A deep learning–based system that identifies human facial emotions in real time from a webcam or a static image. It predicts seven emotion classes.",
        stack: "Python · TensorFlow · Keras · NumPy · OpenCV",
        href: "https://github.com/dishanthj/Facial-Emotion-Detection",
      },
    ],
  },
  {
    id: "achievements", name: "Camp 4: The Peak Ridge", elevation: 3800,
    title: "Milestones along the way",
    achievements: [
      {
        title: "Java Full Stack Trainee", by: "QSpiders", when: "Jan 2026 – Sep 2026",
        text: "Completed hands-on full-stack training in building web applications with Java and modern web technologies. Gained practical experience across frontend, backend and database development through projects involving CRUD operations, database integration and web application development.",
        href: "",
      },
      {
        title: "Grand Finalist", by: "SAP Hackfest", when: "2025",
        text: "Reached the grand finals of SAP Hackfest 2025.",
        href: "",
      },
      { title: "Claude Code Badges", by: "Anthropic", when: "Sep 2026 – Present", text: "", href: "" },
      { title: "Data Science with Python", by: "IVIS Lab", when: "Jul 2024 – Sep 2025", text: "", href: "" },
      {
        title: "Basketball and Football", by: "ATME College of Engineering", when: "Inter-college level",
        text: "Represented my college in both sports at inter-college level.",
        href: "",
      },
    ],
  },
  {
    id: "why", name: "Camp 5: The Final Push", elevation: 4400,
    title: "Why hire me?",
    reasons: [
      { icon: "💡", title: "Motivated to keep learning", text: "Full-stack training, a data science course and Anthropic's Claude Code badges: I keep adding new skills, and I do it because I want to, not because I'm told to." },
      { icon: "🤝", title: "A team player", text: "Representing my college in basketball and football taught me to communicate, trust my teammates and win together. I bring that same attitude to code reviews and group projects." },
      { icon: "🚀", title: "Comfortable leading", text: "I'm happy to take ownership: planning the work, helping teammates who are stuck and keeping a project moving until it's finished." },
      { icon: "💻", title: "Backend, frontend and a little AI", text: "I can build a Spring Boot backend, connect it to a React frontend, and add machine-learning features like the YOLO model in my fire-safety project." },
    ],
  },
  {
    id: "summit", name: "Summit", elevation: 5000,
    title: "You made it to the top.",
    body: ["I'm looking for my first role as a Java full-stack or backend developer. If your team needs someone who learns fast and finishes what he starts, let's talk."],
    contact: true,
  },
];
export const MAX_ELEVATION = 5000;   // keep this equal to the Summit elevation