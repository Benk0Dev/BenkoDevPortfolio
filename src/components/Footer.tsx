import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Linkedin, Github, Mail  } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from "react";

export default function Footer() {
    const maxMobileWidth = 770;
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= maxMobileWidth) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="footer">
            <div className="footer-content container">
                {!isMobile && <Logo />}
                <div className="footer-links">
                    <Link to="https://www.linkedin.com/in/benas-kuliesis/" target="_blank">
                        <Linkedin size="1.6em" strokeWidth={1.75} />
                    </Link>
                    <Link to="https://github.com/Benk0Dev" target="_blank">
                        <Github size="1.6em" strokeWidth={1.75} />
                    </Link>
                    <Link to="mailto:bkuliesis@gmail.com" target="_blank">
                        <Mail size="1.6em" strokeWidth={1.75} />
                    </Link>
                    <Link to="https://wa.me/447845644972" target="_blank">
                        <FontAwesomeIcon icon={faWhatsapp} style={{height: "1.6em"}} />
                    </Link>
                </div>
            </div>
            <div className="copyright">
                <div className="container">
                    <p>Designed and developed by BenkoDev</p>
                </div>
            </div>
        </div>
    );
}