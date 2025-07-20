import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const skills = [
    { name: "Frontend Development", level: 90, tech: "React, Next.js, TypeScript" },
    { name: "Backend Development", level: 85, tech: "Node.js, Python, Express" },
    { name: "Database Management", level: 80, tech: "MongoDB, PostgreSQL, MySQL" },
    
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Description */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Professional Background</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm a passionate full-stack developer with over 5 years of experience creating 
                  digital solutions that make a difference. I specialize in modern web technologies 
                  and have a strong foundation in both frontend and backend development.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Technical Expertise</h3>
                <p className="text-muted-foreground leading-relaxed">
                  My expertise spans across the entire development stack, from crafting intuitive 
                  user interfaces with React and Vue.js to building robust backend systems with 
                  Node.js and Python. I'm passionate about clean code, performance optimization, 
                  and creating seamless user experiences.
                </p>
              </div>
            </div>

            {/* Right: Skills */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <Card key={index} className="p-4 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress 
                          value={skill.level} 
                          className="h-2"
                          style={{
                            "--progress-background": `hsl(${skill.level * 2}, 70%, 50%)`
                          } as React.CSSProperties}
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
        </div>
      </div>
    </section>
  );
};

export default About;