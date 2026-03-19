import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Values from "@/components/Values";
import Schedules from "@/components/Schedules";
import JoinUs from "@/components/JoinUs";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutUs />
      <Values />
      <Schedules />
      <JoinUs />
      <Gallery />
      <Footer />
    </main>
  );
}
