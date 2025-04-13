import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CV from "/Benas_Kuliesis_CV.pdf";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ArrowRight } from "lucide-react";
import SkillGroup, { SkillGroupProps } from "./main_components/SkillsGroup";
import Project, { ProjectProps } from "./main_components/Project";

// Skills and projects imports
import { CodeXml, BookOpen, Settings, Terminal } from "lucide-react";
import goFetchImage from "/images/gofetch.png";
import runCastImage from "/images/runcast.png";
import benkoDevPortfolio from "/images/benkodev-portfolio.png";
import portfolioWithBlogImage from "/images/portfolio-with-blog.png";
import horseRaceSimulatorImage from "/images/horse-race-simulator.png";
import dynamicNoughtAndCrossesAIImage from "/images/dynamic-noughts-and-crosses-ai.png";
import particlesCollisionSimulatorImage from "/images/particles-collision-simulator.png";

const iconSize = "1.8em";
const iconStrokeWidth = 2.25;

const skillsGroups: Omit<SkillGroupProps, "isOpen" | "handleClick">[] = [
    {
        title: "Programming Languages",
        icon: <CodeXml size={iconSize} strokeWidth={iconStrokeWidth} />,
        skills: [
            { name: "Python", percentage: 90 },
            { name: "Java", percentage: 70 },
            { name: "JavaScript", percentage: 80 },
            { name: "TypeScript", percentage: 80 },
            { name: "HTML", percentage: 90 },
            { name: "CSS", percentage: 80 },
            { name: "MySQL", percentage: 60 },
            { name: "PHP", percentage: 50 },
        ]
    },
    {
        title: "Frameworks & Libraries",
        icon: <BookOpen size={iconSize} strokeWidth={iconStrokeWidth} />,
        skills: [
            { name: "React", percentage: 80 },
            { name: "Node.js", percentage: 70 },
            { name: "Express.js", percentage: 30 },
        ]
    },
    {
        title: "Tools & Technologies",
        icon: <Settings size={iconSize} strokeWidth={iconStrokeWidth} />,
        skills: [
            { name: "Git", percentage: 90 },
            { name: "GitHub", percentage: 90 },
            { name: "Visual Studio Code", percentage: 90 },
            { name: "Figma", percentage: 80 },
            { name: "Canva", percentage: 70 },
            { name: "Visual Paradigm", percentage: 80 },
        ]
    },
    {
        title: "Technical Skills",
        icon: <Terminal size={iconSize} strokeWidth={iconStrokeWidth} />,
        skills: [
            { name: "Object-Oriented Programming", percentage: 80 },
            { name: "Algorithms and Data Structures", percentage: 70 },
            { name: "Database Management", percentage: 60 },
            { name: "RESTful APIs", percentage: 60 },
        ]
    },
];

const projects: ProjectProps[] = [
    {
        link: "https://github.com/Benk0Dev/GoFetch",
        title: "GoFetch",
        description: "A full-stack pet minding web app which allows pet owners to browse pet minders, book services and a messaging users. Includes account management, cusomisable user profiles, and an admin role which handles reports. Also includes pop-up notifications and a demo payment system. This project was built as part of a group project for my university module.",
        image: goFetchImage,
        technologies: ["TypeScript", "React", "Node.js", "Express", "WebSockets", "REST API", "Google Maps Platform", "CSS"],

    },
    {
        link: "https://benk0dev.github.io/RunCast/",
        title: "RunCast",
        description: "A weather web app that provides real-time weather information and forecasts. It uses weather metrics to give runners an evaluation of running conditions and clothing recommendations.",
        image: runCastImage,
        technologies: ["JavaScript", "React", "CSS", "Weather API"],

    },
    {
        link: "https://github.com/Benk0Dev/BenkoDevPortfolio",
        title: "Personal Portfolio Website",
        description: "The website you are currently viewing. A portfolio website built to showcase my projects and skills and allow people to contact me.",
        image: benkoDevPortfolio,
        technologies: ["TypeScript", "React", "CSS"],

    },
    {
        link: "https://github.com/Benk0Dev/Portfolio-With-Blog",
        title: "Portfolio with Blog",
        description: "A full-stack portfolio website with an integrated blog, featuring the ability to preview blog posts before posting them.",
        image: portfolioWithBlogImage,
        technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "MAMP"],
    },
    {
        link: "https://github.com/Benk0Dev/Horse-Race-Simulator",
        title: "Horse Race Simulator",
        description: "A horse race simulator, featuring customisable races and horses, live statistics updates, and virtual betting capabilities.",
        image: horseRaceSimulatorImage,
        technologies: ["Java", "Java Swing"],
    },
    {
        link: "https://github.com/Benk0Dev/Dynamic-Noughts-and-Crosses-AI",
        title: "Dynamic Noughts and Crosses AI",
        description: "A full-stack Noughts and Crosses application where the primary purpose is to play against an AI on a growing grid size which grows as you progress. Features include a leaderboard, back tracking moves, a customisable player vs player option and more.",
        image: dynamicNoughtAndCrossesAIImage,
        technologies: ["Python", "Pygame", "SQLite"],
    },
    {
        link: "https://github.com/Benk0Dev/Particles-Collision-Simulator",
        title: "Particles Collision Simulator",
        description: "A one-dimensional particle collision simulator which models the behavior of three balls contained between two walls, colliding with each other in a continuous loop. Leverages principles of physics such as the conservation of momentum and the law of restitution.",
        image: particlesCollisionSimulatorImage,
        technologies: ["Python", "Pygame"],
    },
];

const em = parseFloat(getComputedStyle(document.documentElement).fontSize);

export default function MainSection() {
    const portfolioRef = useRef<HTMLDivElement>(null);
    const aboutMeRef = useRef<HTMLDivElement>(null);
    const [isStuck, setIsStuck] = useState(true);
    const [stickyPadding, setStickyPadding] = useState("");
    const [openedSkillsGroupIndex, setOpenedSkillsGroupIndex] = useState<number>(-1);

    const maxMobileWidth = 770;

    useEffect(() => {
        const handleScroll = () => {
            const portfolio = portfolioRef.current;

            if (!portfolio) return;
            
            if (window.innerWidth <= maxMobileWidth) return;

            const portfolioRect = portfolio.getBoundingClientRect();

            if (window.innerHeight >= portfolioRect.bottom) {
                setIsStuck(false);
                setStickyPadding(`${portfolioRect.height - window.innerHeight + (5 + 0.15) * em}px`);
            } else {
                setIsStuck(true);
                setStickyPadding("");
            }
        };

        const handleResize = () => {
            if (window.innerWidth <= maxMobileWidth) {
                setIsStuck(false);
                setStickyPadding("");
            } else {
                handleScroll();
            }
        };
    
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleResize);
        };
      }, []);

    return (
        <div ref={portfolioRef} className="portfolio-container">
            <div id="portfolio" className="container">
                {/* about me column */}
                <div className="about-me-wrapper">
                    <div 
                        className={`about-me ${isStuck ? "stuck" : "unstuck"}`}
                        style={{ paddingTop: stickyPadding? stickyPadding : undefined }}
                        ref={aboutMeRef}
                    >
                        <h1>About Me</h1>
                        <article>
                            <p>
                                I am a BSc Computer Science student at Queen Mary University of London with experience in software and web development. My aim is to work part of a team of developers to create innovative software solutions that solve real-world problems.
                            </p>
                        </article>
                        <div className="links-contact-container">
                            <div className="links">
                                <Link to="https://www.linkedin.com/in/benas-kuliesis/" target="_blank" className="btn btn-link">
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </Link>
                                <Link to="https://github.com/Benk0Dev" target="_blank" className="btn btn-link">
                                    <FontAwesomeIcon icon={faGithub} />
                                </Link>
                                <Link to="mailto:bkuliesis@gmail.com" target="_blank" className="btn btn-link">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </Link>
                                <Link to="https://wa.me/447845644972" target="_blank" className="btn btn-link">
                                    <FontAwesomeIcon icon={faSquareWhatsapp} />
                                </Link>
                                <Link to={CV} target="_blank" className="cv-btn rotate-arrow-parent">
                                    Résumé<ArrowRight className="rotate-arrow" strokeWidth={2} />
                                </Link>
                            </div>
                            <button
                                className="btn btn-rnd"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const targetElement = document.getElementById("contact");
                                    if (targetElement) {
                                        targetElement.scrollIntoView({ behavior: "smooth" });
                                    }
                                }}
                            >
                                Contact Me
                            </button>
                        </div>
                    </div>
                </div>
                {/* skills and projects column */}
                <div className="skills-projects">
                    {/* skills */}
                    <div className="skills">
                        <h1>Skills</h1>
                        <div className="skills-container">
                            {skillsGroups.map((group, index) => (
                                <SkillGroup
                                    key={index}
                                    title={group.title}
                                    icon={group.icon}
                                    skills={group.skills}
                                    isOpen={openedSkillsGroupIndex === index}
                                    handleClick={() => openedSkillsGroupIndex === index ? setOpenedSkillsGroupIndex(-1) : setOpenedSkillsGroupIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                    {/* projects */}
                    <div className="projects">
                        <h1>Projects</h1>
                        <div className="projects-container">
                            {projects.map((project, index) => (
                                <Project
                                    key={index}
                                    link={project.link}
                                    title={project.title}
                                    description={project.description}
                                    image={project.image}
                                    technologies={project.technologies}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}