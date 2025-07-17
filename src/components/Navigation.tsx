import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Track active section
      let current = "";
      navItems.forEach(({ href }) => {
        const section = document.querySelector(href);
        if (
          section &&
          window.scrollY >= section.offsetTop - 100
        ) {
          current = href;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLinkClick = (href: string) => {
    const section = document.querySelector(href);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out rounded-full w-[85%]",
        scrolled
          ? "bg-white/80 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/30 shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              className="text-2xl font-bold text-zinc-900 dark:text-zinc-100"
            >
              AC
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
            {/* Dark Mode Toggle */}
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

            {/* Mobile Menu Button */}
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
