export const portfolioData = {
    personalInfo: {
        name: "Pradeep M",
        title: "AI Engineer",
        summary: "AI Engineer specializing in computer vision systems and scalable backend architectures. Experienced in designing distributed AI pipelines, deploying machine learning inference services, and building high-performance APIs using FastAPI and Docker. Skilled in Python, Java, and cloud-native infrastructure for production AI applications.",
        email: "pradeepmurugesan.dev@gmail.com",
        phone: "+91 9629810007",
        location: "Salem, Tamil Nadu, India",
        linkedin: "https://www.linkedin.com/in/mpradeep-dev/",
        github: "https://github.com/Mpradeep-dev"
    },
    skills: {
        "AI & Computer Vision": ["YOLO (Ultralytics)", "MediaPipe", "OpenCV", "Deep Learning", "Pose Estimation", "Object Detection"],
        "Backend Technologies": ["FastAPI", "Spring Boot", "SQLAlchemy", "Pydantic", "REST APIs", "Microservices"],
        "DevOps & Tools": ["Docker", "Nginx", "RabbitMQ", "Redis", "GitHub Actions", "Linux", "Postman", "Swagger"],
        "Databases": ["PostgreSQL", "MySQL", "H2", "Minio"],
        "Programming Languages": ["Python", "Java", "SQL"],
        "Data & ML Libraries": ["NumPy", "Pandas", "Matplotlib"]
    },
    experience: [
        {
            role: "AI Engineer",
            company: "Global Tech Professionals, London",
            duration: "Oct 2025 – Present",
            description: "Computer Vision & Backend Engineering | Remote",
            responsibilities: [
                "Designed and deployed real-time computer vision pipelines using YOLO and MediaPipe integrated with FastAPI services.",
                "Built scalable microservices and asynchronous task pipelines using RabbitMQ and Redis.",
                "Containerized AI and backend applications using Docker and managed deployments via Nginx.",
                "Optimized model inference performance and API response latency for production environments."
            ],
            technologies: ["YOLO", "MediaPipe", "FastAPI", "RabbitMQ", "Redis", "Docker", "Nginx"]
        },
        {
            role: "Freelance Computer Vision Engineer",
            company: "Self-Employed",
            duration: "2026 – Present",
            description: "Computer Vision & Deep Learning | Remote",
            responsibilities: [
                "Developed custom computer vision solutions using deep learning and image processing.",
                "Implemented object detection, pose estimation, and motion analysis systems using Python and OpenCV.",
                "Improved model accuracy through hyperparameter tuning, evaluation metrics, and dataset optimization.",
                "Delivered end-to-end AI solutions from model design to deployment."
            ],
            technologies: ["Python", "OpenCV", "Deep Learning", "Image Processing"]
        },
        {
            role: "Intern — IT Solutions & Project Management",
            company: "SplendensLab IT Ventures, Salem",
            duration: "Oct 2024",
            description: "IT Solutions & Project Management",
            responsibilities: [
                "Assisted in software development workflows and project execution for enterprise IT solutions.",
                "Collaborated with developers to understand system requirements and implementation processes.",
                "Supported testing, documentation, and deployment activities for software projects.",
                "Gained exposure to project management and software lifecycle methodologies."
            ],
            technologies: []
        }
    ],
    projects: [
        {
            name: "ESTIMAX-AI",
            description: "AI Blueprint Estimation System integrating Flutter clients, FastAPI microservices, and Modal inference workers.",
            technologies: ["Flutter", "FastAPI", "RabbitMQ", "Supabase", "Modal", "Docker", "YOLOv8n", "OpenCV"],
            link: "https://github.com/EstimaX-AI",
            category: "AI / ML"
        },
        {
            name: "AI_Trainer",
            description: "Real-time AI sports training system for gym workouts and football performance analysis using pose estimation.",
            technologies: ["YOLO", "YOLO-Pose", "MediaPipe", "OpenCV", "Python"],
            link: "https://github.com/Mpradeep-dev/AI_Trainer",
            category: "AI / ML"
        },
        {
            name: "drowsiness-detection",
            description: "Real-time driver fatigue detection system using facial landmarks and Eye Aspect Ratio (EAR).",
            technologies: ["OpenCV", "Dlib", "Python"],
            link: "https://github.com/Mpradeep-dev/drowsiness-detection",
            category: "AI / ML"
        }
    ],
    education: [
        {
            degree: "M.Tech in Computer Science and Engineering",
            institution: "Erode Sengunthar Engineering College, Perundurai",
            duration: "2027",
            score: "CGPA: 7.9"
        },
        {
            degree: "HSC",
            institution: "SRV Boys Higher Secondary School",
            duration: "2022",
            score: "79.9%"
        },
        {
            degree: "SSLC",
            institution: "SRV Boys Higher Secondary School",
            duration: "2020",
            score: "68.4%"
        }
    ],
    hobbies: [
        {
            name: "Gaming",
            description: "Playing strategy and action games",
            icon: "Gamepad2",
            games: ["game1.jpg", "game2.jpg", "game3.jpg"] // Placeholder for UI mapping
        },
        {
            name: "Crypto trading",
            description: "Analyzing markets and trading cryptocurrencies",
            icon: "Bitcoin",
        },
        {
            name: "Technology exploration",
            description: "Keeping up with the latest in tech world",
            icon: "Cpu"
        },
        {
            name: "AI experimentation",
            description: "Prototyping new AI ideas and playing with models",
            icon: "Bot"
        }
    ]
};
