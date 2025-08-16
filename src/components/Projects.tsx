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
import { ExternalLink, Github } from "lucide-react";
import campusConnect from "@/assets/campusConnectImage.png";
import farmerMarketplace from "@/assets/farmerMarketplaceImage.png";
import fitLife from "@/assets/fitlifeImage.png";
import classTimetable from "@/assets/classTimetableImage.png";
import listify from "@/assets/listifyImage.png";

// Add type for Project
interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

const Projects = () => {
  // Update the useState type
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);

  const projects: Project[] = [
    {
      title: "CampusConnect - Student Collaboration Hub",
      description:
        "CampusConnect helps students learn directly from faculty through shared courses, quizzes, and study materials.It offers real-time chat for easy communication and support.Students can also explore and register for college events and workshops.",
      image: campusConnect,
      technologies: ["React", "Django", "postgreSQL", "Tailwind CSS"],
      liveUrl: "https://github.com/Satya0418/Campus_connect",
      githubUrl: "https://github.com/Satya0418/Campus_connect",
    },
    {
      title: "ClassTimetable App",
      description:
        "A responsive app for viewing and managing college schedules, with features like color-coded subjects and user-friendly UI.",
      image: classTimetable,
      technologies: ["React", "Tailwind CSS"],
      liveUrl: "https://github.com/Abhi-engg/Class-Time-table",
      githubUrl: "https://github.com/Abhi-engg/Class-Time-table",
    },
    {
      title: "Farmer Marketplace",
      description:
        "A sustainable shopping platform that connects local farmers with consumers. Includes location-based discovery, price tracking, and fresh produce listings.",
      image: farmerMarketplace,
      technologies: ["React", "Tailwind CSS", "Django", "postgreSQL"],
      liveUrl: "https://github.com/Abhi-engg/Farmer-Marketplace",
      githubUrl: "https://github.com/Abhi-engg/Farmer-Marketplace",
    },
    {
      title: "ListiFy - To-Do-List",
      description:
        "A productivity web app with smart task management, personalized timetables, sticky notes. Built for seamless planning and tracking.",
      image: listify,
      technologies: ["HTML", "CSS", "JavaScript"],
      liveUrl:
        "https://listi-fy-to-do-list-website-aiyfywnx8-abhi-enggs-projects.vercel.app/",
      githubUrl: "https://github.com/Abhi-engg/ListiFy-To-do-List-Website",
    },
    {
      title: "FitLife - Fitness Guide",
      description:
        "A fitness companion app for goal tracking, calorie monitoring, and personalized workout plans. Includes interactive forms and health insights.",
      image: fitLife,
      technologies: ["Html", "CSS", "JavaScript"],
      liveUrl: "https://github.com/Abhi-engg/FitLife--A-Fitness-Guide",
      githubUrl: "https://github.com/Abhi-engg/FitLife--A-Fitness-Guide",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
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
      <div className="container mx-auto px-7">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header Animation */}
          <div className="text-center mb-16 p-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto transform transition-all duration-700 hover:scale-105">
              Here are some of my recent projects that showcase my skills and
              passion for creating innovative digital solutions.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto mt-6 transform scale-x-0 animate-[scaleX_0.8s_ease-out_0.5s_forwards] origin-center"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`project-card transform transition-all duration-700 ${
                  visibleProjects.includes(index)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                data-index={index}
              >
                <Card className="group h-full relative overflow-hidden bg-project-card hover:bg-project-card-hover transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 cursor-pointer border-0 hover:border hover:border-primary/20">
                  {/* Image Container with Fixed Aspect Ratio */}
                  <div className="relative w-full pt-[50.25%] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-contain bg-gray-50 dark:bg-gray-900 transition-all duration-700 group-hover:scale-105 group-hover:rotate-1 group-hover:brightness-110"
                      loading="lazy"
                    />

                    {/* Enhanced Overlay - Update z-index */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 z-20 backdrop-blur-sm">
                      <Button
                        variant="secondary"
                        size="sm"
                        asChild
                        className="transform -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100 hover:scale-110 shadow-lg"
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
                        className="transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-200 hover:scale-110 shadow-lg"
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Github className="h-4 w-4" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>

                  <CardHeader className="relative z-10 p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed transition-all duration-300 group-hover:text-foreground/80 mt-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10 p-4 sm:p-6 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs bg-tech-badge text-tech-badge-foreground transform transition-all duration-300 hover:scale-110 hover:shadow-md cursor-default opacity-80 group-hover:opacity-100"
                          style={{
                            animationDelay: `${techIndex * 0.1}s`,
                            animation: visibleProjects.includes(index)
                              ? "slideInUp 0.5s ease-out forwards"
                              : "none",
                          }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Enhanced View All Button */}
          <div className="text-center mt-12">
            <a
              href="https://github.com/Abhi-engg?tab=repositories" // <-- Replace with your GitHub repo link
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="relative overflow-hidden group border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
                  View All Projects
                </span>
                <ExternalLink className="ml-2 h-4 w-4 relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Button>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleX {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .project-card {
          transition-delay: var(--delay, 0ms);
        }
      `}</style>
    </section>
  );
};

export default Projects;
