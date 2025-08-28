import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Zap, Star } from "lucide-react";

// Import images properly
import campusConnectImage from "@/assets/campusConnectImage.png";
import farmerMarketplaceImage from "@/assets/farmerMarketplaceImage.png";
import fitlifeImage from "@/assets/fitlifeImage.png";
import classTimetableImage from "@/assets/classTimetableImage.png";
import listifyImage from "@/assets/listifyImage.png";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
}

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const projects: Project[] = [
    {
      title: "CampusConnect - Student Collaboration Hub",
      description:
        "CampusConnect helps students learn directly from faculty through shared courses, quizzes, and study materials. It offers real-time chat for easy communication and support. Students can also explore and register for college events and workshops.",
      image: campusConnectImage, // Use the imported image directly
      technologies: ["React", "Django", "PostgreSQL", "Tailwind CSS"],
      liveUrl: "https://github.com/Satya0418/Campus_connect",
      githubUrl: "https://github.com/Satya0418/Campus_connect",
    },
    {
      title: "ClassTimetable App",
      description:
        "A responsive app for viewing and managing college schedules, with features like color-coded subjects and user-friendly UI.",
      image: classTimetableImage, // Use the imported image directly
      technologies: ["React", "Tailwind CSS"],
      liveUrl: "https://github.com/Abhi-engg/Class-Time-table",
      githubUrl: "https://github.com/Abhi-engg/Class-Time-table",
    },
    {
      title: "Farmer Marketplace",
      description:
        "A sustainable shopping platform that connects local farmers with consumers. Includes location-based discovery, price tracking, and fresh produce listings.",
      image: farmerMarketplaceImage, // Use the imported image directly
      technologies: ["React", "Tailwind CSS", "Django", "PostgreSQL"],
      liveUrl: "https://github.com/Abhi-engg/Farmer-Marketplace",
      githubUrl: "https://github.com/Abhi-engg/Farmer-Marketplace",
    },
    {
      title: "ListiFy - To-Do-List",
      description:
        "A productivity web app with smart task management, personalized timetables, sticky notes. Built for seamless planning and tracking.",
      image: listifyImage, // Use the imported image directly
      technologies: ["HTML", "CSS", "JavaScript"],
      liveUrl:
        "https://listi-fy-to-do-list-website-aiyfywnx8-abhi-enggs-projects.vercel.app/",
      githubUrl: "https://github.com/Abhi-engg/ListiFy-To-do-List-Website",
    },
    {
      title: "FitLife - Fitness Guide",
      description:
        "A fitness companion app for goal tracking, calorie monitoring, and personalized workout plans. Includes interactive forms and health insights.",
      image: fitlifeImage, // Use the imported image directly
      technologies: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://github.com/Abhi-engg/FitLife--A-Fitness-Guide",
      githubUrl: "https://github.com/Abhi-engg/FitLife--A-Fitness-Guide",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index || "0");
            setTimeout(() => {
              setVisibleProjects((prev) => [...new Set([...prev, index])]);
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(".project-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-20 relative">
            <div className="relative z-10 space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent leading-tight">
                My Projects
              </h2>
              <div className="flex items-center justify-center gap-4 mt-8">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary"></div>
                <Star className="h-6 w-6 text-primary" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary"></div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`project-card group relative transform transition-all duration-1000 ${
                  visibleProjects.includes(index)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                data-index={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm group-hover:blur-md"></div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute -top-3 -right-3 z-30 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    Featured
                  </div>
                )}

                <Card className="relative h-full bg-background/95 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden group-hover:border-primary/30 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-3">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,theme(colors.primary.500)_1px,transparent_1px)] bg-[length:20px_20px] animate-pulse"></div>
                  </div>

                  {/* Image Section */}
                  <div className="relative overflow-hidden rounded-t-3xl">
                    {/* Floating Elements */}
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-100"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-200"></div>
                    </div>

                    <div className="relative aspect-video bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 filter group-hover:brightness-110 group-hover:saturate-110"
                        loading="lazy"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Hover Buttons */}
                      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm">
                        <Button
                          variant="secondary"
                          size="sm"
                          asChild
                          className="transform -translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 hover:scale-110 shadow-xl bg-background/90 backdrop-blur-sm border border-primary/20 hover:border-primary/50"
                        >
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200 hover:scale-110 shadow-xl bg-background/90 backdrop-blur-sm border border-primary/20 hover:border-primary/50"
                        >
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Github className="h-4 w-4" />
                            Source Code
                          </a>
                        </Button>
                      </div>

                      {/* Animated Corner Decoration */}
                      <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10 rotate-45 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300"></div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4 relative z-10">
                    <CardHeader className="p-0">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed text-sm">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    {/* Technologies */}
                    <CardContent className="p-0">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className={`text-xs font-medium px-3 py-1 rounded-full bg-muted/70 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105 cursor-default border border-border/50 hover:border-primary/30 ${
                              hoveredCard === index ? "animate-bounce" : ""
                            }`}
                            style={{
                              animationDelay: `${techIndex * 100}ms`,
                              animationDuration: "0.6s",
                            }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Card>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <div className="text-center mt-20 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <div className="w-96 h-96 border border-primary/20 rounded-full animate-spin-slow"></div>
            </div>

            <a
              href="https://github.com/Abhi-engg?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                size="lg"
                className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 px-8 py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Github className="h-5 w-5" />
                  Explore All Projects
                  <ExternalLink className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Animated background particles */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping delay-0"></div>
                  <div className="absolute top-6 right-8 w-1 h-1 bg-white rounded-full animate-ping delay-700"></div>
                  <div className="absolute bottom-4 left-12 w-1 h-1 bg-white rounded-full animate-ping delay-1000"></div>
                </div>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;