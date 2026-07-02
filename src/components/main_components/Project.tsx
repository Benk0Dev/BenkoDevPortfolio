import { Link } from "react-router-dom";
import styles from "./Project.module.css";
import { ArrowRight, Star } from "lucide-react";

export interface ProjectProps {
    link: string;
    title: string;
    description: string;
    image: string;
    video?: string;
    technologies: string[];
    featured?: boolean;
}

export default function Project({ link, title, description, image, video, technologies, featured }: ProjectProps) {
    return (
        <Link to={link} target="_blank" className={`${styles.project} ${featured ? styles.featuredProject : ""} card rotate-arrow-parent`}>
            {featured && (
                <div className={styles.featuredBadge}>
                    <Star size="0.75em" strokeWidth={2.5} fill="currentColor" />
                    <span>Featured</span>
                </div>
            )}
            <div className={styles.projectDescription}>
                <div className={styles.projectTitle}>
                    <h2>{title}</h2>
                    <ArrowRight className={`${styles.arrow} rotate-arrow`} size="1.5em" strokeWidth={3} />
                </div>
                <p>{description}</p>
            </div>
            <div className={styles.projectImageContainer}>
                {video ? (
                    <video className={styles.projectVideo} autoPlay loop muted playsInline>
                        <source src={video} type="video/mp4" />
                    </video>
                ) : (
                    <img src={image} alt={title} className={styles.projectImage} />
                )}
            </div>
            <div className={styles.technologies}>
                {technologies.map((tech, index) => (
                    <span key={index}>{tech}</span>
                ))}
            </div>
        </Link>
    );
}