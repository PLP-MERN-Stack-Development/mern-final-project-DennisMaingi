import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#0B1021]">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F162D] to-[#0B1021] -z-10" />

      <div className="container mx-auto px-4 py-24 md:py-40">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
                Accessible Education for{" "}
                <span className="text-white">Everyone</span>
              </h1>

              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
                Empowering learners of all abilities with inclusive, accessible courses designed
                for special needs education and beyond.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base px-8 py-6 rounded-xl bg-[#6366F1] hover:bg-[#5457d9] text-white shadow-md">
                Start Learning Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-xl bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/10 text-white">
              <div>
                <div className="text-4xl font-bold">10K+</div>
                <div className="text-sm text-white/50">Active Learners</div>
              </div>
              <div>
                <div className="text-4xl font-bold">500+</div>
                <div className="text-sm text-white/50">Courses</div>
              </div>
              <div>
                <div className="text-4xl font-bold">98%</div>
                <div className="text-sm text-white/50">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={heroImage}
                alt="Students learning in an inclusive classroom"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating blurs */}
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-purple-500/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-blue-500/20 rounded-full blur-3xl" />
          </div>

        </div>
      </div>
    </section>
  );
};
