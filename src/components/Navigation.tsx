import { useState, useEffect, useRef } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

// Simple Button component
const Button = ({ variant = "default", size = "default", className = "", onClick, children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
  };
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    icon: "h-10 w-10",
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Utility function to combine class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    scrollProgress: 0,
    scrollVelocity: 0,
    isScrolling: false,
    direction: "down",
  });

  const lastScrollY = useRef(0);
  const velocityRef = useRef(0);
  const frameRef = useRef(0);
  const isScrollingTimeout = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownHeight, setDropdownHeight] = useState(0);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ];

  // Advanced easing functions
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
  const easeInOutQuart = (t) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

  // Calculate dropdown height when content changes
  useEffect(() => {
    if (dropdownRef.current) {
      const height = dropdownRef.current.scrollHeight;
      setDropdownHeight(height);
    }
  }, [navItems]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        frameRef.current = requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
          ) - window.innerHeight;
          
          const rawProgress = docHeight > 0 ? Math.min(scrollY / (docHeight * 0.25), 1) : 0;
          const easedProgress = easeOutQuart(rawProgress);

          // Calculate velocity
          const velocity = scrollY - lastScrollY.current;
          velocityRef.current = velocity * 0.1 + velocityRef.current * 0.9;

          // Direction detection
          const direction = velocity > 0 ? "down" : "up";
          const isScrolling = scrollY > 10;

          setScrollData({
            scrollY,
            scrollProgress: easedProgress,
            scrollVelocity: Math.abs(velocityRef.current),
            isScrolling,
            direction,
          });

          // Clear scrolling timeout
          if (isScrollingTimeout.current) {
            clearTimeout(isScrollingTimeout.current);
          }

          // Set new timeout for scroll end detection
          isScrollingTimeout.current = setTimeout(() => {
            setScrollData((prev) => ({ ...prev, scrollVelocity: 0 }));
          }, 100);

          // Active section tracking
          let current = "#home";
          navItems.forEach(({ href }) => {
            const element = document.querySelector(href);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= 120 && rect.bottom >= 120) {
                current = href;
              }
            }
          });
          setActiveSection(current);

          lastScrollY.current = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (isScrollingTimeout.current) {
        clearTimeout(isScrollingTimeout.current);
      }
    };
  }, [navItems]);

  useEffect(() => {
    // Initialize dark mode based on system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
    
    // Apply dark mode class to document
    const applyDarkMode = (isDark) => {
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    applyDarkMode(prefersDark);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setDarkMode(e.matches);
      applyDarkMode(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLinkClick = (href) => {
    setIsOpen(false);
    setActiveSection(href);
    
    // Smooth scroll to target element
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    } else {
      // If element doesn't exist, just scroll to top for home
      if (href === '#home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Navigation dimensions with smooth scaling
  const { scrollProgress, scrollVelocity, isScrolling, direction } = scrollData;
  
  const navWidth = Math.max(63, 88 - easeInOutCubic(scrollProgress) * 25);
  const navTop = Math.max(0.25, 0.75 - easeInOutQuart(scrollProgress) * 0.5);
  const navScale = Math.max(0.92, 1 - easeInOutCubic(scrollProgress) * 0.08);

  // Content scaling
  const textScale = Math.max(0.85, 1 - easeInOutCubic(scrollProgress) * 0.15);
  const spacing = Math.max(1.5, 2.5 - easeInOutCubic(scrollProgress) * 1);

  // Dynamic effects based on scroll velocity
  const velocityEffect = Math.min(scrollVelocity * 0.02, 0.1);
  const dynamicBlur = Math.min(20, 12 + velocityEffect * 8);
  const dynamicOpacity = Math.min(1, 0.85 + velocityEffect * 0.1);

  return (
    <>
      {/* Mobile Navigation */}
      <nav
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 w-[95%] z-50 md:hidden rounded-2xl transition-all duration-500 ease-out",
          isScrolling
            ? darkMode
              ? "bg-gray-900/90 border border-gray-800/60 shadow-lg backdrop-blur-md"
              : "bg-white/90 border border-gray-200/70 shadow-lg backdrop-blur-md"
            : "bg-transparent border-transparent"
        )}
        style={{
          transform: `translateX(-50%) translateY(${
            direction === "down" && isScrolling ? "4px" : "0px"
          })`,
        }}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo with enhanced hover */}
            <button
              onClick={() => handleLinkClick("#home")}
              className="relative flex items-center justify-center group transition-all duration-300 ease-out"
            >
              <div 
                className={cn(
                  "relative w-9 h-9 rounded-xl flex items-center justify-center border shadow-sm transition-all duration-300 ease-out group-hover:scale-105 group-active:scale-95",
                  darkMode 
                    ? "bg-gradient-to-br from-blue-500/15 via-blue-500/10 to-blue-500/15 border-blue-500/30 shadow-blue-500/10"
                    : "bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-blue-500/10 border-blue-500/20 shadow-gray-500/10"
                )}
              >
                <span 
                  className={cn(
                    "text-base font-black transition-all duration-300 ease-out group-hover:scale-105",
                    darkMode
                      ? "bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent"
                      : "bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent"
                  )}
                >
                  AY.
                </span>
              </div>
            </button>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Enhanced Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="group relative rounded-xl hover:bg-gray-100/60 dark:hover:bg-gray-800/60 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
              >
                <div className="relative w-4 h-4">
                  {/* Sun Icon */}
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out",
                      darkMode 
                        ? "rotate-0 opacity-100 scale-100" 
                        : "rotate-90 opacity-0 scale-75"
                    )}
                  >
                    <Sun className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  </div>
                  
                  {/* Moon Icon */}
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out",
                      !darkMode 
                        ? "rotate-0 opacity-100 scale-100" 
                        : "rotate-90 opacity-0 scale-75"
                    )}
                  >
                    <Moon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  </div>
                </div>
              </Button>

              {/* Enhanced Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                className="group relative rounded-xl transition-all duration-300 ease-out hover:bg-gray-100/60 dark:hover:bg-gray-800/60 hover:scale-105 active:scale-95"
              >
                <div className="relative w-4 h-4">
                  {/* Menu Icon */}
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out",
                      !isOpen 
                        ? "rotate-0 opacity-100 scale-100" 
                        : "rotate-90 opacity-0 scale-75"
                    )}
                  >
                    <Menu className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  </div>
                  
                  {/* X Icon */}
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out",
                      isOpen 
                        ? "rotate-0 opacity-100 scale-100" 
                        : "rotate-90 opacity-0 scale-75"
                    )}
                  >
                    <X className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  </div>
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
              isOpen ? "opacity-100" : "opacity-0"
            )}
            style={{
              height: isOpen ? `${dropdownHeight + 16}px` : "0px",
              transform: `translateY(${isOpen ? "0px" : "-12px"}) scale(${isOpen ? "1" : "0.95"})`,
            }}
          >
            <div 
              ref={dropdownRef}
              className="py-2 px-1"
            >
              <div 
                className={cn(
                  "relative overflow-hidden rounded-xl backdrop-blur-sm border transition-all duration-500 ease-out",
                  darkMode
                    ? "bg-gradient-to-b from-gray-800/80 to-gray-900/80 border-gray-700/40"
                    : "bg-gradient-to-b from-white/80 to-gray-50/80 border-gray-200/40"
                )}
              >
                {navItems.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => handleLinkClick(item.href)}
                    className={cn(
                      "w-full text-left block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ease-out flex items-center justify-between group",
                      activeSection === item.href
                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        : "hover:bg-gray-100/60 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300"
                    )}
                    style={{
                      transitionDelay: isOpen ? `${index * 75}ms` : "0ms",
                      transform: `translateX(${isOpen ? "0px" : "-20px"})`,
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <span className="relative z-10 transition-all duration-300 ease-out">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {activeSection === item.href && (
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 transition-all duration-300 ease-out" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav
        className={cn(
          "fixed left-1/2 z-50 rounded-full transition-all duration-700 ease-out hidden md:block",
          isScrolling
            ? darkMode
              ? "bg-gray-900/80 border border-gray-800/60 shadow-2xl backdrop-blur-md"
              : "bg-white/90 border border-gray-200/70 shadow-2xl backdrop-blur-md"
            : "bg-transparent border-transparent"
        )}
        style={{
          top: `${navTop}rem`,
          width: `${navWidth}%`,
          maxWidth: isScrolling ? "650px" : "1000px",
          transform: `translateX(-50%) scale(${navScale}) translateY(${
            direction === "down" ? velocityEffect * 2 : -velocityEffect * 2
          }px)`,
          backdropFilter: `blur(${dynamicBlur}px)`,
          opacity: dynamicOpacity,
        }}
      >
        <div className="container mx-auto transition-all duration-700 ease-out px-6">
          <div className="flex items-center justify-between transition-all duration-700 ease-out h-16">
            {/* Enhanced Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => handleLinkClick("#home")}
                className="relative flex items-center justify-center group transition-all duration-300 ease-out"
              >
                <div
                  className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 ease-out group-active:scale-95"
                  style={{
                    transform: `scale(${1 - scrollProgress * 0.1})`,
                  }}
                >
                  <span className="relative z-10 text-base font-black bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300 ease-out">
                    AY.
                  </span>
                </div>
              </button>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:block">
              <div
                className="flex items-center transition-all duration-700 ease-out"
                style={{ gap: `${spacing * 0.5}rem` }}
              >
                {navItems.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => handleLinkClick(item.href)}
                    className={cn(
                      "relative font-semibold transition-all duration-300 ease-out group px-4 py-2 rounded-lg hover:scale-105 active:scale-95",
                      activeSection === item.href
                        ? "text-gray-900 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                    )}
                    style={{
                      fontSize: `${0.875 * textScale}rem`,
                      transform: `translateY(${
                        velocityEffect * (index % 2 === 0 ? 1 : -1)
                      }px)`,
                      transition: `all 0.3s ease-out ${
                        index * 0.1
                      }s`,
                    }}
                  >
                    {/* Background hover effect */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-lg transition-all duration-300 ease-out opacity-0 group-hover:opacity-100",
                        darkMode ? "bg-white/5" : "bg-black/5"
                      )}
                    />

                    {/* Text */}
                    <span className="relative z-10">{item.name}</span>

                    {/* Underline indicator */}
                    <div
                      className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-300 ease-out rounded-full bg-gradient-to-r from-blue-600 to-blue-800",
                        activeSection === item.href
                          ? "w-8 h-0.5 opacity-100"
                          : "w-0 h-0.5 opacity-0 group-hover:w-8 group-hover:opacity-100"
                      )}
                    />
                  </button>
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
                className="group relative rounded-full hover:bg-gray-100/60 dark:hover:bg-gray-800/60 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
              >
                <div className="relative">
                  {darkMode ? (
                    <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-all duration-300 ease-out" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-all duration-300 ease-out" />
                  )}
                </div>
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;