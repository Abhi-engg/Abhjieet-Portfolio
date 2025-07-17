import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navigation";
import Squares from "@/components/ui/Sqaures"; // ✅ Import the animation component

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ✅ Background Animation */}
      <Squares
        speed={0.4}
        squareSize={50}
        direction="diagonal"
        borderColor="#777"
        hoverFillColor="#333"
      />

      {/* ✅ Main Content */}
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <About />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
