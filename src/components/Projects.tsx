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
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const Projects = () => {
  const projects = [
    {
      title: "ListiFy - To-Do Manager",
      description:
        "A productivity web app with smart task management, personalized timetables, sticky notes, and an AI-powered scheduler. Built for seamless planning and tracking.",
      // image: listifyImage, // Replace with actual image import
      technologies: ["React", "JavaScript", "Tailwind CSS", "Vite"],
      liveUrl: "https://listify.vercel.app", // Replace with actual URL
      githubUrl: "https://github.com/yourusername/listify", // Replace with actual repo
    },
    {
      title: "FitLife - Fitness Tracker",
      description:
        "A fitness companion app for goal tracking, calorie monitoring, and personalized workout plans. Includes interactive forms and health insights.",
      // image: fitlifeImage,
      technologies: ["React", "Tailwind CSS", "JavaScript"],
      liveUrl: "#", // Add actual URL
      githubUrl: "#",
    },
    {
      title: "Farmer Marketplace",
      description:
        "A sustainable shopping platform that connects local farmers with consumers. Includes location-based discovery, price tracking, and fresh produce listings.",
      // image: farmerMarketplaceImage,
      technologies: ["React", "Tailwind CSS", "JavaScript"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "ClassTimetable App",
      description:
        "A responsive app for viewing and managing college schedules, with features like color-coded subjects and user-friendly UI.",
      // image: classTimetableImage,
      technologies: ["React", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "CampusConnect - Student Collaboration Hub",
      description:
        "A feature-rich platform connecting students and faculty for networking, events, mentorship, and collaborative learning. Includes real-time messaging, shared study materials, course creation, and profile management.",
      // image: campusConnectImage, // Replace with your actual image import
      technologies: [
        "React",
        "Django",
        "MongoDB",
        "WebSockets",
        "Tailwind CSS",
      ],
      liveUrl: "#", // Replace with deployed link if available
      githubUrl: "#", // Replace with GitHub repo link
    },
  ];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-7">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 p-6">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and
              passion for creating innovative digital solutions.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 bg-project-card hover:bg-project-card-hover"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <Button variant="secondary" size="sm" asChild>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs bg-tech-badge text-tech-badge-foreground"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Projects
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
