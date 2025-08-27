const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col justify-center items-center gap-2 text-center">
          {/* Centered Text */}
          <p className="text-sm text-muted-foreground">
            © {currentYear}{" "}
            <a
              href="#home"
              className="font-semibold text-foreground hover:underline hover:text-primary transition"
            >
              Abhijeet
            </a>
          </p>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <span className="animate-pulse">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
