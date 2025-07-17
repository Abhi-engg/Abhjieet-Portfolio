import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroAvatar from "@/assets/hero-avatar.jpg";

const Hero = () => {
  const techStack = ["React", "TypeScript", "Vite", "Tailwind CSS"];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-hero-gradient-start to-hero-gradient-end py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-muted-foreground">Hello, I'm</p>
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight">
                Abhijeet Yadav
              </h1>
              <h2 className="text-2xl lg:text-3xl text-muted-foreground font-medium">
                Full Stack Developer
              </h2>
            </div>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Passionate about creating exceptional digital experiences using modern web technologies. 
              I build scalable, user-friendly applications with a focus on performance and design.
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="px-3 py-1 bg-tech-badge text-tech-badge-foreground"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Contact Me
                <Mail className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                View Projects
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 p-8">
              <img
                src={heroAvatar}
                alt="Alex Chen"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm rounded-full p-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;