import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CourseCatalog } from "@/components/CourseCatalog";
import { Mission } from "@/components/Mission";
import { Footer } from "@/components/Footer";
import { AIChatbot } from "@/components/AIChatbot";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Header />

      {/* Main content grows to fill remaining space */}
      <main id="main-content" className="flex-1 flex flex-col w-full">
        <section className="w-full">
          <Hero />
        </section>
        <section className="w-full">
          <Features />
        </section>
        <section className="w-full">
          <CourseCatalog />
        </section>
        <section className="w-full">
          <Mission />
        </section>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Index;
