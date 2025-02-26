import { useTheme } from "@/context/theme-provider"
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom"
import CitySearch from "./city-search";

const Header = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark"
    return (
        <header className='py-6 sticky top-0 border-b backdrop-blur bg-background/95 supports-[backdrop-filter]:bg-background/50 z-50'>
            <div className="container flex items-center justify-between gap-4">
                <Link to={"/"} className="text-lg font-bold tracking-tighter text-green-600 whitespace-nowrap">React Weather</Link>
                {/* Search */}
                <CitySearch />
                <button onClick={() => setTheme(isDark ? "light" : "dark")} className={`flex items-center transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"}`}>
                    {isDark ? <Sun className="size-6 text-yellow-500 rotate-0 transition-all" /> : <Moon className="size-6 text-blue-500 rotate-0 transition-all" />}
                </button>
            </div>
        </header>
    )
}

export default Header