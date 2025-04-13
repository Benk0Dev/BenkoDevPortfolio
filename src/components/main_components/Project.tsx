import { Link } from "react-router-dom";
import styles from "./Project.module.css";
import { ArrowRight } from "lucide-react";

export interface ProjectProps {
    link: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
}

export default function Project({ link, title, description, image, technologies }: ProjectProps) {    
    return (
        <Link to={link} target="_blank" className={`${styles.project} card rotate-arrow-parent`}>
            <div className={styles.projectDescription}>
                <div className={styles.projectTitle}>
                    <h2>{title}</h2>
                    <ArrowRight className={`${styles.arrow} rotate-arrow`} size="1.5em" strokeWidth={3.25} />
                </div>
                <p>{description}</p>
            </div>
            <div className={styles.projectImageContainer}>
                <img src={image} alt={title} className={styles.projectImage} />
            </div>
            <div className={styles.technologies}>
                {technologies.map((tech, index) => (
                    <span key={index}>{tech}</span>
                ))}
            </div>
        </Link>
    );
}