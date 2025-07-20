import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
// import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navigation";
import Squares from "@/components/ui/Sqaures";
import Resume from "@/components/Resume";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Animation */}
      <Squares
        speed={0.5}
        squareSize={50}
        direction="diagonal"
        borderColor="#777"
        hoverFillColor="#333"
      />

      {/* Main Content */}
      <Navbar />
        <main>
          <section id="home">
            <Hero />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="resume">
            {" "}
            <Resume />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
      <Footer />
    </div>
  );
};

export default Index;
