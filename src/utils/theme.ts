export enum Theme {
    LIGHT = "light",
    DARK = "dark",
}

export function updateTheme() {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    function applyTheme(theme: Theme | null = null) {
        if (!theme) {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.setAttribute("data-theme", prefersDark ? Theme.DARK : Theme.LIGHT);
        } else {
            document.documentElement.setAttribute("data-theme", theme);
        }
    }

    applyTheme(savedTheme);

    // Listen for system theme changes when no theme is saved
    if (!savedTheme) {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
            applyTheme();
        });
    }
}

export function toggleTheme() {
    const currentTheme = localStorage.getItem("theme") as Theme | null;
    switch (currentTheme) {
        case Theme.LIGHT:
            localStorage.setItem("theme", Theme.DARK);
            break;
        case Theme.DARK:
            localStorage.removeItem("theme");
            break;
        default:
            localStorage.setItem("theme", Theme.LIGHT);
            break;
    }
    updateTheme();
}

export function getTheme() {
    return localStorage.getItem("theme") as Theme | null;
}
