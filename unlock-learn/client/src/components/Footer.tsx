import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: 'Email required', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      await api.post('/newsletter/subscribe', { email });
      toast({ title: 'Subscribed!', description: 'Thank you for subscribing to our newsletter.' });
      setEmail('');
    } catch (error: any) {
      toast({ title: 'Subscription failed', description: error.response?.data?.message || 'Please try again', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[var(--card)] border-t border-[var(--border)] w-full">
      <div className="container mx-auto px-6 py-12 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {/* Brand */}
          <div className="space-y-4">
            <span className="font-bold text-xl text-[var(--primary-600)]">Inclusive Learning</span>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Empowering learners of all abilities with accessible, inclusive education.
            </p>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li><a href="#" className="hover:text-[var(--primary-600)] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[var(--primary-600)] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[var(--primary-600)] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[var(--primary-600)] transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li><a href="/courses" className="hover:text-[var(--primary-600)] transition-colors">Browse Courses</a></li>
              <li><a href="#" className="hover:text-[var(--primary-600)] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[var(--primary-600)] transition-colors">Accessibility</a></li>
              <li><a href="#" className="hover:text-[var(--primary-600)] transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-[var(--muted)] mb-4">
              Get the latest courses and accessibility updates.
            </p>
            <form className="space-y-2 w-full max-w-xs" onSubmit={handleSubscribe}>
              <Input 
                type="email" 
                placeholder="Your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[var(--border)] focus:border-[var(--primary-600)]"
                disabled={loading}
              />
              <Button type="submit" className="w-full bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white" disabled={loading}>
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-[var(--border)] w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--muted)] w-full">
            <p>© 2025 Inclusive Learning. All rights reserved.</p>
                      </div>
        </div>
      </div>
    </footer>
  );
};