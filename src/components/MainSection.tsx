import { useState } from "react";
import { Link } from "react-router-dom";
import CV from "/Benas_Kuliesis_CV.pdf";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ArrowRight } from "lucide-react";
import SkillGroup, { SkillGroupProps } from "./main_components/SkillsGroup";
import Project, { ProjectProps } from "./main_components/Project";

import { CodeXml, BookOpen, Server, CloudUpload, Settings, Terminal } from "lucide-react";
import comingSoonImage from "/images/coming-soon.png";
import linguaImage from "/images/lingua.png";
import goFetchImage from "/images/gofetch.png";
import runCastImage from "/images/runcast.png";
import portfolioWithBlogImage from "/images/portfolio-with-blog.png";
import horseRaceSimulatorImage from "/images/horse-race-simulator.png";
import horseRaceSimulatorVideo from "/videos/horse-race-simulator.mp4"
import dynamicNoughtAndCrossesAIImage from "/images/dynamic-noughts-and-crosses-ai.png";
import dynamicNoughtAndCrossesAIVideo from "/videos/dynamic-noughts-and-crosses-ai.mp4";
import particlesCollisionSimulatorImage from "/images/particles-collision-simulator.png";
import particlesCollisionSimulatorVideo from "/videos/particles-collision-simulator.mp4";

const iconSize = "1.8em";
const iconStrokeWidth = 2.25;

const skillsGroups: Omit<SkillGroupProps, "isOpen" | "handleClick">[] = [
    {
        title: "Languages",
        icon: <CodeXml size={iconSize} strokeWidth={iconStrokeWidth} />,
        skills: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "HTML", "CSS", "PHP"],
    },
    {
        title: "Frameworks",
        icon: <BookOpen size={iconSize} strokeWidth={iconStrokeWidth} />,
        skills: ["React", "React Native", "Next.js", "Node.js", "Express.js", "Prisma ORM", "Zustand", "TailwindCSS", "PyTorch", "NumPy"],
    },
    {
        title: "Databases",
        icon: <Server size={iconSize} strokeWidth={iconStrokeWidth} />,
        skills: ["PostgreSQL", "Neon", "Supabase", "DynamoDB", "MySQL"],
    },
    {
        title: "Cloud & Data",
        icon: <CloudUpload size={iconSize} strokeWidth={iconStrokeWidth} />,
        skills: ["AWS CDK", "AWS Lambda", "Amazon API Gateway", "Amazon Cognito", "Amazon S3", "DynamoDB", "AWS Athena", "Amazon QuickSight", "AWS Lake Formation", "RDS", "Apache Spark", "Apache Hadoop"],
    },
    {
        title: "Tools",
        icon: <Settings size={iconSize} strokeWidth={iconStrokeWidth} />,
        skills: ["Git", "GitHub", "Docker", "Jupyter Notebook", "Figma", "Canva", "Visual Paradigm", "Adobe Photoshop", "Capcut"],
    },
    {
        title: "Technical Skills",
        icon: <Terminal size={iconSize} strokeWidth={iconStrokeWidth} />,
        skills: ["System Architecture", "REST APIs", "WebSockets", "Distributed Systems", "Cloud Computing", "Cryptography", "Big Data Processing", "Machine Learning", "Algorithms & Data Structures"],
    },
];

const projects: ProjectProps[] = [
    {
        link: "https://github.com/Benk0Dev/multilingual-messaging-app",
        title: "Lingua",
        description: "A production-ready mobile multilingual messaging app which features automatic real-time message translation and server-side encryption.",
        image: linguaImage,
        technologies: ["React Native", "Expo", "AWS CDK", "AWS Lambda", "API Gateway", "Express", "WebSockets", "DynamoDB", "Amazon Cognito", "Neon", "Amazon S3", "Google Cloud Translation LLM", "Prisma", "TypeScript", "AES-256-GCM"],
        featured: true,
    },
    {
        link: "https://github.com/Benk0Dev/",
        title: "The Prize Hunt",
        description: "A lottery-style cash competitions web app for a startup which features a wallet system and full admin dashboard.",
        image: comingSoonImage,
        technologies: ["Next.js", "TypeScript", "Supabase", "Prisma", "React", "Tailwind CSS"],
    },
    {
        link: "https://github.com/Benk0Dev/GoFetch",
        title: "GoFetch",
        description: "A prototype pet minding platform built as team lead for a university group project, featuring a booking workflow, filtered minder browsing, and dual role-based dashboards.",
        image: goFetchImage,
        technologies: ["TypeScript", "React", "Node.js", "Express", "REST API", "Google Maps Platform", "CSS"],
    },
    {
        link: "https://benk0dev.github.io/RunCast/",
        title: "RunCast",
        description: "A weather web app that evaluates real-time running conditions and provides clothing recommendations based on weather metrics.",
        image: runCastImage,
        technologies: ["JavaScript", "React", "CSS", "Weather API"],
    },
    {
        link: "https://github.com/Benk0Dev/Portfolio-With-Blog",
        title: "Portfolio with Blog",
        description: "A full-stack portfolio website with an integrated blog and live post preview before publishing.",
        image: portfolioWithBlogImage,
        technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    },
    {
        link: "https://github.com/Benk0Dev/Horse-Race-Simulator",
        title: "Horse Race Simulator",
        description: "A horse race simulator featuring customisable races and horses, live statistics updates, and virtual betting.",
        image: horseRaceSimulatorImage,
        video: horseRaceSimulatorVideo,
        technologies: ["Java", "Java Swing"],
    },
    {
        link: "https://github.com/Benk0Dev/Dynamic-Noughts-and-Crosses-AI",
        title: "Dynamic Noughts and Crosses AI",
        description: "A Noughts and Crosses game against an AI on a grid that grows as you progress. Features a leaderboard, move backtracking, and a customisable player vs player mode.",
        image: dynamicNoughtAndCrossesAIImage,
        video: dynamicNoughtAndCrossesAIVideo,
        technologies: ["Python", "Pygame", "SQLite"],
    },
    {
        link: "https://github.com/Benk0Dev/Particles-Collision-Simulator",
        title: "Particles Collision Simulator",
        description: "A physics simulator modelling one-dimensional collisions between three balls, implementing conservation of momentum and the law of restitution.",
        image: particlesCollisionSimulatorImage,
        video: particlesCollisionSimulatorVideo,
        technologies: ["Python", "Pygame"],
    },
];

export default function MainSection() {
    const [openedSkillsGroupIndex, setOpenedSkillsGroupIndex] = useState<number>(-1);

    return (
        <div className="portfolio-container">
            <div id="portfolio" className="container">
                {/* about me column */}
                <div className="about-me-wrapper">
                    <div className="about-me">
                        <h1>About Me</h1>
                        <article>
                            <p>
                                Software engineer with experience across mobile, cloud, and full-stack development. Former SDE Intern at Amazon Prime Video, returning full-time in August. Interested in startups and always open to connecting with founders building something interesting.
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
                                    video={project.video}
                                    technologies={project.technologies}
                                    featured={project.featured}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
