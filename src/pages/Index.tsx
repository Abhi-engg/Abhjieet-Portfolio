import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen">
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
