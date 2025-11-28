import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Facebook, Linkedin, Twitter, Mail, MapPin, Phone, Quote, HeartHandshake } from 'lucide-react';

const About = () => {
  return (
    <Layout className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold mb-2">About InclusiveLearn</h1>
          <p className="text-[var(--muted)]">Empowering learners of all abilities through accessible education.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Our Vision</CardTitle>
            <CardDescription>Building a world where quality learning is accessible to everyone.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We believe education transforms lives. InclusiveLearn is on a mission to democratize learning with inclusive design,
              accessibility-first experiences, and community-driven support so every learner can thrive.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Accessibility by design (WCAG-conscious components, keyboard-first navigation)</li>
              <li>Multilingual support and culturally aware content</li>
              <li>Assistive-friendly experiences and equitable access</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Motivation</CardTitle>
            <CardDescription>What drives us forward</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <BlockQuote quote="Education is the most powerful weapon which you can use to change the world." author="Nelson Mandela" />
              <BlockQuote quote="Alone we can do so little; together we can do so much." author="Helen Keller" />
            </div>
            <p>
              Our platform is guided by empathy, inclusivity, and excellence. We’re committed to continuous improvement and
              to partnering with educators, parents, and learners in building lasting impact.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Find us</CardTitle>
            <CardDescription>We are based in Nairobi, Kenya</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Nairobi, Kenya</p>
            <Separator />
            <div className="flex flex-wrap gap-3 items-center">
              <a className="inline-flex items-center gap-2 text-[var(--primary-600)] hover:underline" href="https://facebook.com" target="_blank" rel="noreferrer">
                <Facebook className="h-4 w-4" /> Facebook
              </a>
              <a className="inline-flex items-center gap-2 text-[var(--primary-600)] hover:underline" href="https://x.com" target="_blank" rel="noreferrer">
                <Twitter className="h-4 w-4" /> X (Twitter)
              </a>
              <a className="inline-flex items-center gap-2 text-[var(--primary-600)] hover:underline" href="https://linkedin.com" target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a className="inline-flex items-center gap-2 text-[var(--primary-600)] hover:underline" href="mailto:maingidennis790@gmail.com">
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button className="bg-[var(--primary-600)] hover:bg-[var(--primary-700)]">
            <HeartHandshake className="mr-2 h-4 w-4" /> Join our mission
          </Button>
        </div>
      </div>
    </Layout>
  );
};

const BlockQuote = ({ quote, author }: { quote: string; author: string }) => (
  <figure className="rounded-lg border p-4 bg-[var(--card)]">
    <blockquote className="text-lg italic flex gap-2">
      <Quote className="h-5 w-5 flex-shrink-0" />
      <span>“{quote}”</span>
    </blockquote>
    <figcaption className="mt-2 text-sm text-[var(--muted)]">— {author}</figcaption>
  </figure>
);

export default About;
