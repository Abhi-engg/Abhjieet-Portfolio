import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroAvatar from "@/assets/hero-avatar.jpg";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ["Full Stack Developer", "React Developer", "Problem Solver"];
  const techStack = ["React", "TypeScript", "Vite", "Tailwind CSS"];

  useEffect(() => {
    setIsVisible(true);
    
    // Role typing animation
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center from-hero-gradient-start to-hero-gradient-end py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              {/* Animated greeting */}
              <p 
                className={`text-muted-foreground transition-all duration-700 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Hello, I'm
              </p>
              
              {/* Name with letter-by-letter animation */}
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight">
                {"Abhijeet Yadav".split("").map((letter, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-500 ease-out hover:scale-110 hover:text-primary cursor-default ${
                      isVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
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
              <div className="h-12 overflow-hidden">
                <h2 
                  className={`text-2xl lg:text-3xl text-muted-foreground font-medium transition-all duration-700 ease-in-out ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  key={currentRole}
                >
                  <span className="inline-block animate-pulse">|</span>
                  {roles[currentRole]}
                </h2>
              </div>
            </div>

            {/* Animated description */}
            <p 
              className={`text-lg text-muted-foreground max-w-lg leading-relaxed transition-all duration-1000 ease-out delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Passionate about creating exceptional digital experiences using modern web technologies. 
              I build scalable, user-friendly applications with a focus on performance and design.
            </p>

            {/* Tech Stack with staggered hover effects */}
            <div 
              className={`flex flex-wrap gap-2 transition-all duration-1000 ease-out delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {techStack.map((tech, index) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className={`px-3 py-1 bg-tech-badge text-tech-badge-foreground transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* CTA Buttons with enhanced hover effects */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Button 
                size="lg" 
                className="group relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center">
                  Contact Me
                  <Mail className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:rotate-12" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="group relative overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:border-primary/50"
              >
                <span className="relative z-10 flex items-center transition-colors duration-300 group-hover:text-primary">
                  View Projects
                  <ArrowDown className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-y-1 group-hover:animate-bounce" />
                </span>
              </Button>
            </div>

            {/* Social Links with ripple effect */}
            <div 
              className={`flex gap-4 transition-all duration-1000 ease-out delay-900 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {[Github, Linkedin, Mail].map((Icon, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full relative overflow-hidden group transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Icon className="h-5 w-5 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110" />
                  <span className="sr-only">Social Link</span>
                  <div className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Button>
              ))}
            </div>
          </div>

          {/* Right Image with smooth animations */}
          <div 
            className={`relative transition-all duration-1200 ease-out delay-200 ${
              isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 p-8 group hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105">
              <img
                src={heroAvatar}
                alt="Abhijeet Yadav"
                className="w-full h-auto rounded-2xl shadow-2xl transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-3xl"
              />
              
              {/* Enhanced status indicator */}
              <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm rounded-full p-2 transition-all duration-300 hover:scale-110">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>

              {/* Floating elements with smooth animation */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary/30 rounded-full animate-float opacity-60"></div>
              <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-accent/40 rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/3 -right-3 w-2 h-2 bg-primary/50 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-8 -left-8 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-8 -right-8 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-10px) rotate(5deg); 
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;