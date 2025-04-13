import { useEffect, useState } from "react";
import { Menu, SunMoon, Sun, Moon, X } from "lucide-react";
import { Theme, toggleTheme, getTheme } from "../utils/theme";
import Logo from "./Logo";

function getThemeIcon() {
    const currentTheme = getTheme();
    if (currentTheme === Theme.LIGHT) {
        return <Sun size={32} strokeWidth={1.75} />;
    } else if (currentTheme === Theme.DARK) {
        return <Moon size={32} strokeWidth={1.75} />;
    } else {
        return <SunMoon size={32} strokeWidth={1.75} />;
    }
}

export default function Navbar() {
    const maxMobileWidth = 770;
    const [isScrolled, setIsScrolled] = useState(false);
    const [themeIcon, setThemeIcon] = useState(getThemeIcon());
    const [isMobile, setIsMobile] = useState(window.innerWidth <= maxMobileWidth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= maxMobileWidth);
            setIsMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const oneEmInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);
            setIsScrolled(window.scrollY > oneEmInPixels);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            style={{
                position: isScrolled ? 'fixed' : undefined,
                top: isScrolled ? '0' : '',
                borderBottom: isScrolled ? '2px solid var(--fg-color)' : '',
            }}
            className="navbar-container"
        >
            <div className="container navbar">
                {isMobile && (
                    <button className="btn btn-clear nav-btn" onClick={() => setIsMenuOpen(true)}>
                        <Menu size={32} strokeWidth={1.75} />
                    </button>
                )}
                <Logo />
                {!isMobile && (
                    <div className="nav">
                        {["home", "portfolio", "contact"].map((item) => (
                            <button
                                key={item}
                                className="btn btn-clear"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const targetElement = document.getElementById(item);
                                    if (targetElement) {
                                        targetElement.scrollIntoView({ behavior: "smooth" });
                                    }
                                }}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </button>
                        ))}
                    </div>
                )}
                <button
                    className="btn btn-clear color-theme-btn"
                    onClick={(e) => {
                        e.preventDefault();
                        toggleTheme();
                        setThemeIcon(getThemeIcon());
                    }}
                    title="Toggle theme"
                    aria-label="Toggle theme"
                    aria-pressed={getTheme() === Theme.LIGHT ? "true" : "false"}
                    aria-expanded={getTheme() === Theme.LIGHT ? "true" : "false"}
                    aria-controls="theme-toggle"
                    aria-haspopup="true"
                >
                    {themeIcon}
                </button>
            </div>
            <div className={"nav-menu-background" + (isMenuOpen ? " open" : "")} onClick={() => setIsMenuOpen(false)} />
            <nav className={"nav-menu" + (isMenuOpen ? " open" : "")} onClick={(e) => e.stopPropagation()}>
                <button
                    className="btn nav-btn exit-nav-btn"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <X size={24} strokeWidth={2} />
                </button>
                {["home", "portfolio", "contact"].map((item) => (
                    <button
                        key={item}
                        className="btn btn-clear nav-menu-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            const targetElement = document.getElementById(item);
                            if (targetElement) {
                                targetElement.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                ))}
            </nav>
        </div>
    );
}