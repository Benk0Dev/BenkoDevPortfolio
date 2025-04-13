import styles from "./SkillsGroup.module.css";
import { ChevronDown } from "lucide-react";

export interface SkillGroupProps {
    title: string;
    icon: React.ReactElement;
    skills: {
        name: string;
        percentage: number;
    }[];
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
                <div className={styles.skillsList}>
                    {skills.map((skill, index) => (
                        <div key={index} className={styles.skill}>
                            <h4>{skill.name}</h4>
                            <div className={styles.skillBar}>
                                <span 
                                    className={styles.percentage}
                                    style={{
                                        left: `calc(${skill.percentage}% - 2.6em)`,
                                    }}
                                >
                                    {skill.percentage}%
                                </span>
                                <div className={styles.skillBarFill} style={{ width: `${skill.percentage}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}