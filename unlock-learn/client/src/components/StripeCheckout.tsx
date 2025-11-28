import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { toast } from 'sonner';

interface StripeCheckoutProps {
  courseId: string;
  courseName: string;
  price: number;
  currency?: string;
}

export const StripeCheckout = ({ courseId, courseName, price, currency = 'usd' }: StripeCheckoutProps) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/stripe-checkout', {
        courseId,
        courseName,
        price,
        currency,
      });
      
      window.location.href = data.url;
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Payment failed');
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={loading}>
      {loading ? 'Processing...' : `Pay $${price}`}
    </Button>
  );
};
