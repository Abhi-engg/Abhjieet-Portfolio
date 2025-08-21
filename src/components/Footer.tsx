import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: (
        <Github className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      ),
      href: "https://github.com/Abhi-engg",
    },
    {
      name: "LinkedIn",
      icon: (
        <Linkedin className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      ),
      href: "https://www.linkedin.com/in/abhijeet-yadav-429b83212/",
    },
    {
      name: "Email",
      icon: (
        <Mail className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      ),
      href: "mailto:abhijeetyadav33xb@gmail.com",
    },
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-6 py-12">
        {/* Layout: 1 column on mobile, 2 columns on sm, 4 columns on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Abhijeet Yadav
              </h3>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Full Stack Developer passionate about building scalable and
                intuitive web applications. Let's innovate together!
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  className="rounded-full group hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                  asChild
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    {link.icon}
                    <span className="sr-only">{link.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ExternalLink className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Spotify (responsive) */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Now Playing</h4>
            <div className="w-full rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-colors duration-300">
              <div className="relative h-40 sm:h-44 md:h-48 lg:h-52">
                <iframe
                  src="https://open.spotify.com/embed/playlist/0GaOaMKDWY1g1ovYLdfZ9Y?utm_source=generator"
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  style={{ border: "0" }}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Abhijeet Yadav.
          </p>
          <p className="text-muted-foreground text-sm">Made with ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
