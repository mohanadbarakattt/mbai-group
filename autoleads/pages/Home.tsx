import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/sections/Hero";
import { Services } from "../components/sections/Services";
import { Process } from "../components/sections/Process";
import { CTABanner } from "../components/sections/CTABanner";
import { Stats } from "../components/sections/Stats";
import { Pricing } from "../components/sections/Pricing";
import { About } from "../components/sections/About";
import { Testimonials } from "../components/sections/Testimonials";
import { Contact } from "../components/sections/Contact";

export default function Home() {
  return (
    <div className="autoleads-page min-h-screen flex flex-col w-full bg-background text-foreground">
      <Navbar />
      <main className="flex-1 w-full">
        <Hero />
        <Services />
        <CTABanner />
        <Process />
        <Stats />
        <Pricing />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
