import { Footer, LogoShowcase } from "@/components";
import {
  AboutSection,
  ContactSection,
  HeroSection,
  ProjectsSection,
} from "@/sections";

export default function Home() {
  return (
    <main className="p-8">
      <HeroSection />
      <AboutSection />
      <LogoShowcase />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
