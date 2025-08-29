import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Abhimine from "@/assets/Abhimine.png";
import { keyframes, css } from "@emotion/react";

const float = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-10px) rotate(5deg); 
  }
`;

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ["Full Stack Developer", "React Developer", "Problem Solver"];
  const techStack = ["React", "Node.js", "Python", "Danjgo", "MongoDB"];

  useEffect(() => {
    setIsVisible(true);

    // Role typing animation
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center from-hero-gradient-start to-hero-gradient-end py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              {/* Adjust greeting text size */}
              <p
                className={`text-sm sm:text-base text-muted-foreground transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Hello, I'm
              </p>

              {/* Name with letter-by-letter animation */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                {"Abhijeet Yadav".split("").map((letter, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-500 ease-out hover:scale-110 hover:text-primary cursor-default ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      transitionDelay: `${index * 0.08}s`,
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </h1>

              {/* Animated role with typewriter effect */}
              <div className="h-8 sm:h-12 overflow-hidden">
                <h2
                  className={`text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-medium transition-all duration-700 ease-in-out ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8"
                  }`}
                  key={currentRole}
                >
                  <span className="inline-block animate-pulse">|</span>
                  {roles[currentRole]}
                </h2>
              </div>
            </div>

            {/* Adjust description text size */}
            <p
              className={`text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed transition-all duration-1000 ease-out delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Passionate about creating exceptional digital experiences using
              modern web technologies. I build scalable, user-friendly
              applications with a focus on performance and design.
            </p>

            {/* Adjust tech stack layout */}
            <div
              className={`flex flex-wrap justify-center lg:justify-start gap-2 transition-all duration-1000 ease-out delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {techStack.map((tech, index) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className={`text-xs sm:text-sm px-2 sm:px-3 py-1 bg-tech-badge text-tech-badge-foreground transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Adjust CTA buttons */}
            <div
              className={`flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 transition-all duration-1000 ease-out delay-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto text-sm sm:text-base group relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-xl"
                onClick={() => {
                  const contactSection = document.querySelector("#contact");
                  contactSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="relative z-10 flex items-center">
                  Contact Me
                  <Mail className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:rotate-12" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>

              <Button
                size="lg"
                className="w-full sm:w-auto text-sm sm:text-base group relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-xl"
                onClick={() => {
                  const projectsSection = document.querySelector("#projects");
                  projectsSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="relative z-10 flex">
                  View Projects
                  <ArrowDown className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-y-1 group-hover:animate-bounce" />
                </span>
              </Button>
            </div>

            {/* Adjust social links */}
            <div
              className={`flex justify-center lg:justify-start gap-3 sm:gap-4 transition-all duration-1000 ease-out delay-900 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative overflow-hidden group transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg"
                asChild
              >
                <a
                  href="https://github.com/Abhi-engg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5 transition-all duration-300 group-hover:scale-110" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative overflow-hidden group transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/abhijeet-yadav-429b83212/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5 transition-all duration-300  group-hover:scale-110" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative overflow-hidden group transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg"
                asChild
              >
                <a href="mailto:abhijeetyadav33xb@gmail.com">
                  <Mail className="h-5 w-5 transition-all duration-300 group-hover:scale-110" />
                  <span className="sr-only">Email</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Right Animation Container */}
          <div
            className={`relative order-first lg:order-last transition-all duration-1000 ease-out mt-16 sm:mt-20 lg:mt-0 ${
              isVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <div className="relative mx-auto max-w-[300px] sm:max-w-[360px] lg:max-w-[480px]">
              {/* GIF Container */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-blue-500/10 to-blue-400/5 p-3 sm:p-4 lg:p-6 group hover:shadow-2xl transition-all duration-500 ease-out hover:scale-[1.02]">
                <div className="aspect-square rounded-xl sm:rounded-2xl shadow-xl transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-2xl overflow-hidden">
                  <img
                    src={Abhimine}
                    alt="Coding Animation"
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>

                {/* Status Indicator */}
                <div className="absolute top-5 right-5 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-3 -left-3 w-4 h-4 bg-blue-500/20 rounded-full animate-float"></div>
                <div
                  className="absolute -bottom-3 -right-3 w-4 h-4 bg-blue-400/20 rounded-full animate-float"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-1/3 -right-4 w-3 h-3 bg-blue-500/30 rounded-full animate-float"
                  style={{ animationDelay: "1.5s" }}
                ></div>
              </div>

              {/* Background Blur Effects */}
              <div className="absolute -inset-4 -z-10 opacity-50">
                <div className="absolute top-1/4 left-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
