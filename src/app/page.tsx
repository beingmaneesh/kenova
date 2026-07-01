import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats";
import { AboutSection } from "@/components/sections/about";
import { CoursesSection } from "@/components/sections/courses";
import { CurriculumSection } from "@/components/sections/curriculum";
import { ClassTimingsSection } from "@/components/sections/class-timings";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";
import { ProcessSection } from "@/components/sections/process";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { GallerySection } from "@/components/sections/gallery";
import { FAQSection } from "@/components/sections/faq";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <CoursesSection />
      <CurriculumSection />
      <ClassTimingsSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <GallerySection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
