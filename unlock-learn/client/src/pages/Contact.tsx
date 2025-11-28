import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Facebook, Linkedin, Twitter, Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
  return (
    <Layout className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-2">
        <section className="space-y-6">
          <header>
            <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
            <p className="text-[var(--muted)]">We’re here to help. Reach out and we’ll respond promptly.</p>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>Get in touch</CardTitle>
              <CardDescription>We typically respond within 1 business day.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> 0798846203</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> maingidennis790@gmail.com</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Nairobi, Kenya</p>
              <div className="flex flex-wrap gap-3 items-center pt-2">
                <a className="inline-flex items-center gap-2 text-[var(--primary-600)] hover:underline" href="https://facebook.com" target="_blank" rel="noreferrer">
                  <Facebook className="h-4 w-4" /> Facebook
                </a>
                <a className="inline-flex items-center gap-2 text-[var(--primary-600)] hover:underline" href="https://wa.me/254798846203" target="_blank" rel="noreferrer">
                  <Phone className="h-4 w-4" /> WhatsApp
                </a>
                <a className="inline-flex items-center gap-2 text-[var(--primary-600)] hover:underline" href="https://x.com" target="_blank" rel="noreferrer">
                  <Twitter className="h-4 w-4" /> X (Twitter)
                </a>
                <a className="inline-flex items-center gap-2 text-[var(--primary-600)] hover:underline" href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <Textarea id="message" placeholder="How can we help?" rows={5} required />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" /> Send
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
