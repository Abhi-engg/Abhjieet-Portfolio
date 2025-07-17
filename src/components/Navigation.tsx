import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    // { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.body.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? scrollTop / docHeight : 0;

          setIsScrolling(scrollTop > 0);
          setScrollProgress(progress);

          // Active section tracking
          let current = "";
          navItems.forEach(({ href }) => {
            const section = document.querySelector(href);
            if (section && scrollTop >= section.offsetTop - 100) {
              current = href;
            }
          });
          setActiveSection(current);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const navWidth = 80 - scrollProgress * 30;

  const handleLinkClick = (href: string) => {
    const section = document.querySelector(href);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full w-full max-w-7xl hidden md:block",
        "transition-[width] duration-300 ease-out", // Smooth width transition
        isScrolling
          ? darkMode
            ? "bg-zinc-900/40 border border-zinc-800/30 backdrop-blur-xl shadow-md"
            : "bg-white/80 border border-zinc-200/50 backdrop-blur-xl shadow-md"
          : "bg-transparent"
      )}
      style={{
        width: `${80 - scrollProgress * 30}%`,
        boxShadow: isScrolling
          ? darkMode
            ? "0 4px 30px rgba(0, 0, 0, 0.15)"
            : "0 4px 30px rgba(0, 0, 0, 0.08)"
          : "none",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
  href="#home"
  className="group relative inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white/10 dark:bg-white/5 ring-1 ring-gray-400/50 dark:ring-white/10 shadow-md transition-all duration-300 hover:scale-110 hover:rotate-12 overflow-hidden"
>
  {/* Subtle Glow on Hover */}
  <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-silver/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 blur-sm rounded-xl" />

  {/* Text */}
  <span className="relative z-10 text-gray-900 dark:text-white font-bold tracking-wide group-hover:text-white transition duration-300">
    AY.
  </span>

  {/* Border Glow on Hover */}
  <span className="absolute inset-0 rounded-xl border border-transparent group-hover:border-white/50 transition-all duration-300" />
</a>

          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className={cn(
                    "text-sm font-medium relative transition-all duration-300 group",
                    activeSection === item.href
                      ? "text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  )}
                >
                  {item.name}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-zinc-900 dark:bg-zinc-100 transition-all duration-300",
                      activeSection === item.href
                        ? "w-6"
                        : "w-0 group-hover:w-6"
                    )}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 transition-all duration-300 hover:scale-110"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
              ) : (
                <Moon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
              ) : (
                <Menu className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in-down">
            <div className="px-4 pt-3 pb-4 space-y-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 rounded-2xl mt-2 shadow-xl transition-all duration-300">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className={cn(
                    "block px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md",
                    activeSection === item.href
                      ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100/40 dark:bg-zinc-800/60"
                      : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 hover:dark:text-zinc-100 hover:bg-zinc-100/40 dark:hover:bg-zinc-800/60"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
