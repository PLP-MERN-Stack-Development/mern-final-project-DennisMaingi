import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Sparkles } from "lucide-react";

export const Mission = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Our <span className="text-primary">Mission</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Breaking down barriers to education and creating opportunities for all learners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold">Inclusive by Design</h3>
                <p className="text-muted-foreground">
                  Every feature, every course, every interaction is built with accessibility and inclusion as the foundation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold">Quality Education</h3>
                <p className="text-muted-foreground">
                  Expert-led courses that meet international standards while remaining accessible to all learners.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                  <Sparkles className="h-8 w-8 text-success" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold">Empowerment</h3>
                <p className="text-muted-foreground">
                  Supporting learners, teachers, and caregivers with the tools and knowledge to succeed together.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-accent rounded-2xl p-8 md:p-12 text-white text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold">
              Join 10,000+ Learners Worldwide
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Whether you're a student, teacher, or caregiver, InclusiveLearn provides the resources and support you need to create positive learning experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
