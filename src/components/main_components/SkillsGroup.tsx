import styles from "./SkillsGroup.module.css";
import { ChevronDown } from "lucide-react";

export interface SkillGroupProps {
    title: string;
    icon: React.ReactElement;
    skills: string[];
    isOpen: boolean;
    handleClick: () => void;
}

export default function SkillsGroup({ title, icon, skills, isOpen, handleClick }: SkillGroupProps) {
    return (
        <div
            className="card"
            onClick={handleClick}
        >
            <div className={styles.skillsGroupHeading}>
                {icon}
                <h2>{title}</h2>
                <ChevronDown size="1.2em" strokeWidth={3} className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ""}`} />
            </div>
            {isOpen && (
                <div className={styles.pillsContainer}>
                    {skills.map((skill, index) => (
                        <span key={index} className={styles.pill}>{skill}</span>
                    ))}
                </div>
            )}
        </div>
    );
}