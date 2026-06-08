export const portfolioData = {
    personalInfo: {
        name: "Pradeep Murugesan",
        title: "AI Engineer",
        tagline: "Building real-time computer vision and GenAI systems — from GPU-optimized model inference to scalable FastAPI backends.",
        summary: "AI Engineer specializing in real-time computer vision and GenAI systems, building low-latency GPU-accelerated inference pipelines and scalable microservice architectures. Experienced in deploying end-to-end AI solutions from model training and ONNX/TensorRT optimization to production-grade FastAPI services and RAG-based AI systems using LangChain and vector databases. Experienced with MLOps practices including Docker, Kubernetes, and CI/CD pipelines, with a focus on reliable backend engineering and cloud deployment.",
        email: "pradeepmurugesan.dev@gmail.com",
        phone: "+91 9629810007",
        location: "Salem, Tamil Nadu, India",
        linkedin: "https://www.linkedin.com/in/mpradeep-dev/",
        github: "https://github.com/Mpradeep-dev"
    },
    skills: {
        "Computer Vision": [
            "YOLO", "YOLO-Pose", "OpenCV", "ONNX", "OpenVINO", "TensorRT", "EfficientNet"
        ],
        "Generative AI": [
            "LangChain", "LangFlow", "RAG Pipelines", "Embeddings", "Qdrant", "Pinecone", "Local Ollama", "vLLM"
        ],
        "Backend": [
            "FastAPI", "Spring Boot", "SQLAlchemy", "REST APIs", "Microservices", "RabbitMQ", "Redis"
        ],
        "MLOps & DevOps": [
            "Docker", "Kubernetes (AKS)", "Nginx", "GitHub Actions", "CI/CD", "Git", "Linux"
        ],
        "Databases": [
            "PostgreSQL", "MySQL", "Minio", "Supabase"
        ],
        "Languages & ML Libs": [
            "Python", "Java", "SQL", "PyTorch", "NumPy", "Pandas", "Matplotlib"
        ],
        "AI Agents & Tools": [
            "Claude", "GitHub Copilot", "Codex", "Gemini CLI"
        ]
    },
    experience: [
        {
            role: "AI Engineer",
            company: "Global Tech Professionals, London",
            duration: "Mar 2025 – Present",
            description: "Computer Vision & Backend Engineering | Remote",
            responsibilities: [
                "Developed real-time computer vision systems using YOLO and YOLO-Pose, integrated with FastAPI for low-latency inference for real-time video processing applications.",
                "Built asynchronous video processing pipelines for model inference and request queuing, improving throughput for batch inference workloads.",
                "Optimized model performance using TensorRT conversion and batching techniques for faster GPU inference.",
                "Implemented and maintained REST APIs and backend services supporting AI workloads, enabling reliable integration with downstream systems.",
                "Developed a real-time chatbot integrated with the backend services to deliver instant, AI-driven responses to user queries."
            ],
            technologies: ["YOLO", "YOLO-Pose", "FastAPI", "TensorRT", "RabbitMQ", "Redis", "Docker"]
        },
        {
            role: "Freelance Computer Vision Engineer",
            company: "Self-Employed",
            duration: "Jul 2024 – Mar 2025",
            description: "Computer Vision & Deep Learning | Remote",
            responsibilities: [
                "Delivered 3+ computer vision solutions for object detection, pose estimation, and motion analysis using Python, OpenCV, and YOLO with GPU-accelerated inference.",
                "Improved model performance across projects through hyperparameter tuning, dataset augmentation, and transfer learning; deployed inference services using FastAPI and Docker."
            ],
            technologies: ["Python", "OpenCV", "YOLO", "FastAPI", "Docker"]
        },
        {
            role: "Java Back End Developer Intern",
            company: "SplendensLab IT Ventures, Salem",
            duration: "Jan 2024 – Jun 2024",
            description: "Backend Development | On-site",
            responsibilities: [
                "Developed REST APIs using Spring Boot and implemented CRUD operations with PostgreSQL database integration.",
                "Built backend modules following MVC architecture and full development lifecycle practices.",
                "Validated APIs using Postman and documented endpoints with Swagger."
            ],
            technologies: ["Java", "Spring Boot", "PostgreSQL", "Postman", "Swagger"]
        }
    ],
    projects: [
        {
            name: "WoundCare-AI",
            description: "Intelligent wound assessment & monitoring platform: YOLO instance segmentation and EfficientNet classification with JWT-secured FastAPI services and RabbitMQ async processing.",
            technologies: ["Flutter", "FastAPI", "RabbitMQ", "PostgreSQL", "Docker", "GitHub Actions", "OpenCV", "YOLO", "EfficientNet"],
            link: "https://github.com/solnae-tech",
            category: "AI / ML"
        },
        {
            name: "ESTIMAX-AI",
            description: "AI Blueprint Estimation System integrating Flutter clients, FastAPI microservices, and Modal inference workers for engineering symbol detection.",
            technologies: ["Flutter", "FastAPI", "RabbitMQ", "Supabase", "Modal", "Docker", "YOLO", "OpenCV"],
            link: "https://github.com/EstimaX-AI",
            category: "AI / ML"
        },
        {
            name: "FAQ-Bot",
            description: "RAG-based FAQ chatbot grounding answers in a knowledge base via semantic embeddings and Qdrant vector search, running a local Ollama LLM with Redis conversational memory.",
            technologies: ["Qdrant", "Embeddings", "Local Ollama", "Redis"],
            link: "https://github.com/Mpradeep-dev/FAQ-bot",
            category: "AI / ML"
        },
        {
            name: "AI_Trainer",
            description: "Real-time AI coaching system using YOLO-Pose for human pose estimation and instant visual feedback on gym exercise form.",
            technologies: ["YOLO-Pose", "OpenCV", "Python"],
            link: "https://github.com/Mpradeep-dev/AI_Trainer",
            category: "AI / ML"
        },
        {
            name: "drowsiness-detection",
            description: "Real-time driver fatigue detection system using Dlib facial landmarks and Eye Aspect Ratio (EAR) analysis at ~30 FPS.",
            technologies: ["OpenCV", "Dlib", "Python"],
            link: "https://github.com/Mpradeep-dev/drowsiness-detection",
            category: "AI / ML"
        }
    ],
    certifications: [
        { name: "Certificate of Appreciation", issuer: "Cognizant", date: "Apr 2026" },
        { name: "Building with the Claude API", issuer: "Anthropic", date: "May 2026" },
        { name: "Claude Code in Action", issuer: "Anthropic", date: "May 2026" },
        { name: "Introduction to Model Context Protocol", issuer: "Anthropic", date: "May 2026" },
        { name: "Introduction to Agent Skills", issuer: "Anthropic", date: "May 2026" },
        { name: "Claude 101", issuer: "Anthropic", date: "May 2026" },
        { name: "Python for Data Analysis", issuer: "Udemy", date: "Nov 2025" },
        { name: "Computer Vision 101", issuer: "Infosys Springboard", date: "Sep 2025" },
        { name: "Computer Vision with Python", issuer: "Udemy", date: "Aug 2025" },
        { name: "Java Programming Masterclass – Beginner to Master", issuer: "Udemy", date: "Jun 2025" },
        { name: "RESTful API Design", issuer: "Infosys Springboard", date: "May 2025" },
        { name: "Overview of API and Microservices", issuer: "Infosys Springboard", date: "May 2025" },
        { name: "Mastering MySQL", issuer: "Udemy", date: "Apr 2025" },
        { name: "Quantum Technologies & Applications", issuer: "AICTE", date: "Mar 2025" },
        { name: "Java FullStack Developer", issuer: "Coursera", date: "Mar 2025" },
        { name: "Frontend for Java Full Stack Development", issuer: "Coursera", date: "Mar 2025" },
        { name: "Object Oriented Programming – Basics to Advance (Java OOP)", issuer: "Udemy", date: "Mar 2025" },
        { name: "Data Science in Education: Learning Analytics & AI-Driven Personalization", issuer: "KSR College of Engineering", date: "Mar 2025" },
        { name: "Fundamentals of Java Programming", issuer: "Coursera", date: "Mar 2025" },
        { name: "Java Database Connectivity (JDBC) Introduction", issuer: "LearnQuest", date: "Mar 2025" },
        { name: "Data Structures & Backend with Java", issuer: "United Latino Students Association", date: "Feb 2025" },
        { name: "Career Essentials in GitHub Professional Certificate", issuer: "GitHub", date: "Feb 2025" },
        { name: "Practical GitHub Actions", issuer: "LinkedIn", date: "Feb 2025" },
        { name: "Practical GitHub Project Management & Collaboration", issuer: "LinkedIn", date: "Feb 2025" },
        { name: "Blockchain Basics", issuer: "LinkedIn", date: "Feb 2025" },
        { name: "Credible Leadership Foundations (CCL-1)", issuer: "LinkedIn", date: "Feb 2025" },
        { name: "XML and Java", issuer: "Infosys Springboard", date: "Feb 2025" },
        { name: "The Java Language", issuer: "LearnQuest", date: "Feb 2025" },
        { name: "Tamil Internet Association Examination – 2023", issuer: "Tamil Internet Association", date: "Dec 2023" },
        { name: "CNC Lathe Operations", issuer: "Erode Sengunthar Engineering College", date: "Jun 2023" },
        { name: "Basics of Python", issuer: "Infosys Springboard", date: "Mar 2023" },
        { name: "SQL", issuer: "HackerRank", date: "" },
        { name: "Web Development (React JS)", issuer: "MSME TDC, Chennai", date: "" }
    ],
    achievements: [
        { title: "1st Place, Codathon", detail: "Kongu Engineering College", year: "2025" }
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
            name: "Cryptocurrency Trading & Market Analysis",
            description: "Actively trade and analyze cryptocurrency markets, combining technical analysis, on-chain data, and market sentiment to time entries and manage risk. Backed by foundational blockchain knowledge (LinkedIn Blockchain Basics).",
            icon: "Bitcoin",
            subTitle: "Skills & focus areas:",
            activities: [
                "Technical analysis — price action, market structure, support/resistance, trend lines",
                "Indicators — RSI, MACD, moving averages, volume profile, Fibonacci retracements",
                "Candlestick patterns and multi-timeframe confluence",
                "Risk management — position sizing, stop-loss/take-profit, risk-reward ratios",
                "Portfolio allocation and capital preservation across market cycles",
                "On-chain analysis and reading order-book / liquidity dynamics",
                "Trading psychology and disciplined, rule-based execution",
                "Blockchain fundamentals — consensus, wallets, DeFi and tokenomics",
                "Macro trends and narratives driving digital-asset markets"
            ]
        },
        {
            name: "Technology Exploration & Hardware Architecture",
            description: "Enjoy exploring modern computing hardware and understanding how system architecture affects performance.",
            icon: "Cpu",
            subTitle: "Areas of exploration include:",
            activities: [
                "CPU architecture and instruction pipelines",
                "GPU compute architectures for graphics and AI workloads",
                "Memory systems and RAM performance tuning",
                "Display technologies and refresh rate optimization",
                "System performance benchmarking and optimization"
            ]
        },
        {
            name: "Artificial Intelligence Experimentation",
            description: "Regularly experiment with AI models, frameworks, and tools to explore new ideas and applications.",
            icon: "Bot",
            subTitle: "Activities & Focus areas:",
            activities: [
                "Prototyping computer vision and machine learning projects",
                "Testing new AI models and frameworks",
                "Experimenting with model optimization and inference pipelines",
                "Building small proof-of-concept AI systems",
                "Computer Vision experimentation",
                "Model deployment and inference optimization",
                "AI system architecture exploration"
            ]
        },
        {
            name: "Continuous Learning & Technical Curiosity",
            description: "Enjoy learning new technologies, reading technical documentation, and exploring how complex systems work internally.",
            icon: "BookOpen",
            subTitle: "This includes:",
            activities: [
                "Exploring new software tools and frameworks",
                "Understanding system design patterns",
                "Studying emerging technologies in AI and distributed systems"
            ]
        },
        {
            name: "Gaming",
            description: "Story-driven & horror games (Alan Wake is my absolute favorite!)",
            icon: "Gamepad2",
            subTitle: "Favorite Games:",
            gamesList: ["Alan Wake 1 & 2", "The Last of Us 1 & 2", "God of War Series", "Red Dead Redemption 2", "Resident Evil Series", "GTA 3, 4, 5 & SA", "Spider-Man 1 & 2", "Until Dawn", "Tomb Raider"]
        }
    ]
};
