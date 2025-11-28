import { Card, CardContent } from "@/components/ui/card";
import { Accessibility, Globe, Headphones, Download, Award, Users } from "lucide-react";

const features = [
  {
    icon: Accessibility,
    title: "WCAG 2.1 AA Compliant",
    description: "Built with accessibility at the core. Screen reader support, keyboard navigation, and high contrast modes.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Headphones,
    title: "Audio & Captions",
    description: "Every video includes professional captions and text-to-speech support for all content.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Download,
    title: "Offline Learning",
    description: "Download courses and learn anywhere, even without internet connectivity.",
    color: "from-green-500 to-teal-500"
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Learn in your preferred language with UI translations and localized content.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Award,
    title: "Certificates",
    description: "Earn recognized certificates upon course completion to showcase your achievements.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a supportive community of learners and educators dedicated to inclusive education.",
    color: "from-indigo-500 to-purple-500"
  },
];

export const Features = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <Card className="p-8 mb-12 text-center shadow-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Built for <span className="text-blue-600 dark:text-blue-400">Accessibility</span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            We believe education should be available to everyone, regardless of ability. 
            Our platform is designed with inclusive features from the ground up.
          </p>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-800"
              >
                <CardContent className="p-6 space-y-4 text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
