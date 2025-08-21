import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const About = () => {
  const skills = [
    {
      name: "Frontend Development",
      level: 80,
      tech: "React, HTML/CSS, TypeScript, Tailwind CSS",
    },
    {
      name: "Backend Development",
      level: 65,
      tech: "Node.js, Django, Express",
    },
    {
      name: "Database Management",
      level: 50,
      tech: "MongoDB, PostgreSQL, MySQL",
    },
  ];

  const interests = [
    "Web Development",
    "Open Source",
    "Machine Learning",
    "App Development",
    "Blockchain",
    "IoT",
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className=" mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent leading-tight">
              About Me
            </h2>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary"></div>
              <Star className="h-6 w-6 text-primary" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start mt-10">
            {/* Left: Description */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Professional Background
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  I’m a Full Stack Developer skilled in React, Node.js, and
                  Django. I love building modern, user-focused web apps and
                  exploring tech like AI, UI/UX, and cloud. Passionate about
                  solving real-world problems through code.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Technical Expertise
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  My expertise spans the full stack—from crafting intuitive
                  interfaces with React to building scalable backends with
                  Django and Node.js. I value clean code, performance, and
                  user-centric design.
                </p>
              </div>
            </div>

            {/* Right: Skills */}
            <div>
              <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Technical Skills
              </h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <Card
                    key={index}
                    className="p-4 hover:shadow-md transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  >
                    <CardContent className="p-0">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold">
                            {skill.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress
                          value={skill.level}
                          className="h-2"
                          style={
                            {
                              "--progress-background": `hsl(${
                                skill.level * 2
                              }, 70%, 50%)`,
                            } as React.CSSProperties
                          }
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {skill.tech}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Interests Section */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              Areas of Interest
            </h3>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {interests.map((interest, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-4 py-2 text-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
