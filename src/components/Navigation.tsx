import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("");
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

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        frameRef.current = requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const rawProgress =
            docHeight > 0 ? Math.min(scrollY / (docHeight * 0.25), 1) : 0;

          // Apply easing to progress for smoother transitions
          const easedProgress = easeOutQuart(rawProgress);

          // Calculate velocity for dynamic effects
          const velocity = scrollY - lastScrollY.current;
          velocityRef.current = velocity * 0.1 + velocityRef.current * 0.9; // Smooth velocity

          // Direction detection
          const direction = velocity > 0 ? "down" : "up";

          // Enhanced scroll detection
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

          // Active section tracking with smooth transitions
          let current = "";
          navItems.forEach(({ href }) => {
            const section = document.querySelector(href);
            if (section && scrollY >= section.offsetTop - 120) {
              current = href;
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
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLinkClick = (href) => {
    const section = document.querySelector(href);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  // Advanced calculated values with multiple easing functions
  const { scrollProgress, scrollVelocity, isScrolling, direction } = scrollData;

  // Navigation dimensions with smooth scaling
  const navWidth = 88 - easeInOutCubic(scrollProgress) * 25; // 88% to 63%
  const navHeight = 18 - easeOutCubic(scrollProgress) * 6; // 72px to 48px
  const navTop = 0.75 - easeInOutQuart(scrollProgress) * 0.5; // Move up slightly
  const navScale = 1 - easeInOutCubic(scrollProgress) * 0.08; // Subtle scale

  // Content scaling
  const logoSize = 11 - easeOutCubic(scrollProgress) * 3; // 44px to 32px
  const textScale = 1 - easeInOutCubic(scrollProgress) * 0.15;
  const iconScale = 1 - easeOutCubic(scrollProgress) * 0.2;
  const spacing = 2.5 - easeInOutCubic(scrollProgress) * 1; // Gap between items

  // Dynamic effects based on scroll velocity
  const velocityEffect = Math.min(scrollVelocity * 0.02, 0.1);
  const dynamicBlur = 12 + velocityEffect * 8; // Increase blur during fast scroll
  const dynamicOpacity = 0.85 + velocityEffect * 0.1;

  // Enhanced shadows and effects
  const shadowIntensity = easeOutCubic(scrollProgress);
  const borderOpacity = 0.3 + easeInOutCubic(scrollProgress) * 0.4;

  return (
    <>
      {/* Scroll indicator */}
      {/* <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[60] transition-all duration-300"
        style={{ 
          width: `${scrollProgress * 100}%`,
          opacity: isScrolling ? 0.6 : 0
        }}
      /> */}

      <nav
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 w-[95%] z-50 md:hidden", // Mobile-specific positioning
          "rounded-2xl transition-all duration-300",
          isScrolling
            ? darkMode
              ? "bg-zinc-900/90 border border-zinc-800/60 shadow-lg"
              : "bg-white/90 border border-zinc-200/70 shadow-lg"
            : "bg-transparent border-transparent"
        )}
        style={{
          backdropFilter: `blur(12px)`,
        }}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#home");
              }}
              className="relative flex items-center justify-center group transition-all duration-300"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                <span className="text-base font-black bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent group-hover:text-blue-600 transition-all duration-300">
                  AY.
                </span>
              </div>
            </a>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="rounded-xl hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50"
              >
                {darkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>

              {/* Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-xl"
              >
                {isOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isOpen && (
            <div className="mt-3 py-2 px-1">
              <div className="relative overflow-hidden rounded-xl">
                {navItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                    className={cn(
                      "block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                      "animate-in slide-in-from-right-5",
                      activeSection === item.href
                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 backdrop-blur-md"
                        : "hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50",
                      "flex items-center justify-between"
                    )}
                  >
                    {item.name}
                    {activeSection === item.href && (
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <nav
        className={cn(
          "fixed left-1/2 z-50 rounded-full transition-all duration-700 ease-out hidden md:block",
          isScrolling
            ? darkMode
              ? "bg-zinc-900/80 border border-zinc-800/60 shadow-2xl"
              : "bg-white/90 border border-zinc-200/70 shadow-2xl"
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
          boxShadow: isScrolling
            ? darkMode
              ? `0 ${8 + shadowIntensity * 12}px ${
                  40 + shadowIntensity * 20
                }px rgba(0, 0, 0, ${0.4 + shadowIntensity * 0.2}), 0 ${
                  2 + shadowIntensity * 4
                }px ${10 + shadowIntensity * 10}px rgba(0, 0, 0, ${
                  0.3 + shadowIntensity * 0.2
                })`
              : `0 ${8 + shadowIntensity * 12}px ${
                  40 + shadowIntensity * 20
                }px rgba(0, 0, 0, ${0.15 + shadowIntensity * 0.1}), 0 ${
                  2 + shadowIntensity * 4
                }px ${10 + shadowIntensity * 10}px rgba(0, 0, 0, ${
                  0.1 + shadowIntensity * 0.1
                })`
            : "none",
          borderColor: isScrolling
            ? darkMode
              ? `rgba(113, 113, 122, ${borderOpacity})`
              : `rgba(228, 228, 231, ${borderOpacity})`
            : "transparent",
        }}
      >
        <div
          className="container mx-auto transition-all duration-700 ease-out"
          style={{
            padding: `0 ${1.5 - scrollProgress * 0.5}rem`,
          }}
        >
          <div
            className="flex items-center justify-between transition-all duration-700 ease-out"
            style={{ height: `${navHeight * 0.25}rem` }}
          >
            {/* Enhanced Logo */}
            <div className="flex-shrink-0">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("#home");
                }}
                className="relative flex items-center justify-center group transition-all duration-300"
              >
                <div
                  className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
                  style={{
                    transform: `scale(${1 - scrollProgress * 0.1})`,
                  }}
                >
                  <span className="text-base font-black bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent group-hover:text-blue-600 transition-all duration-300">
                    AY.
                  </span>
                </div>
              </a>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:block">
              <div
                className="flex items-center transition-all duration-700 ease-out"
                style={{ gap: `${spacing * 0.5}rem` }}
              >
                {navItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className={cn(
                      "relative font-semibold transition-all duration-500 group px-4 py-2 rounded-lg overflow-hidden",
                      activeSection === item.href
                        ? "text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    )}
                    style={{
                      fontSize: `${0.875 * textScale}rem`,
                      transform: `translateY(${
                        velocityEffect * (index % 2 === 0 ? 1 : -1)
                      }px)`,
                      transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${
                        index * 0.1
                      }s`,
                    }}
                  >
                    {/* Background hover effect */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-lg transition-all duration-500 opacity-0 group-hover:opacity-100",
                        darkMode ? "bg-white/5" : "bg-black/5"
                      )}
                    />

                    {/* Text */}
                    <span className="relative z-10">{item.name}</span>

                    {/* Enhanced underline indicator */}
                    <div
                      className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-500 rounded-full",
                        "bg-gradient-to-r from-blue-600 to-black",
                        activeSection === item.href
                          ? "w-8 h-0.5 opacity-100"
                          : "w-0 h-0.5 opacity-0 group-hover:w-8 group-hover:opacity-100"
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
    </>
  );
};

export default Navigation;
