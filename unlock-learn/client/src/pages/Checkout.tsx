import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import { CreditCard, Smartphone } from 'lucide-react';
import { StripeCheckout } from '@/components/StripeCheckout';
import { NeonButton } from '@/components/NeonButton';

const Checkout = () => {
  const { id } = useParams();
  const courseId = id;
  const [course, setCourse] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [loading, setLoading] = useState(false);
  const [mpesaPhone, setMpesaPhone] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to purchase courses',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    if (!courseId) {
      navigate('/courses');
      return;
    }

    loadCourse();
  }, [courseId, user, navigate]);

  const loadCourse = async () => {
    try {
      const { data } = await api.get(`/courses/${courseId}`);
      setCourse(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load course details',
        variant: 'destructive',
      });
      navigate('/courses');
    }
  };



  const handleMpesaPayment = async () => {
    if (!mpesaPhone) {
      toast({
        title: 'Phone number required',
        description: 'Please enter your M-Pesa phone number',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await api.post('/mpesa-payment', {
        courseId: course._id,
        phoneNumber: mpesaPhone,
        amount: course.price,
      });

      toast({
        title: 'Payment initiated',
        description: 'Check your phone for the M-Pesa prompt',
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error: any) {
      toast({
        title: 'Payment failed',
        description: error.response?.data?.message || 'Failed to initiate M-Pesa payment',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };



  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Layout className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Purchase</CardTitle>
              <CardDescription>
                {course.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <span className="font-semibold">Total Amount</span>
                <span className="text-2xl font-bold">
                  {course.currency} {course.price.toFixed(2)}
                </span>
              </div>

              <div>
                <Label className="text-base mb-4 block">Select Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="stripe" id="stripe" />
                    <Label htmlFor="stripe" className="flex-1 cursor-pointer flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Card Payment</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, Apple Pay, Google Pay</p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                    <RadioGroupItem value="mpesa" id="mpesa" />
                    <Label htmlFor="mpesa" className="flex-1 cursor-pointer flex items-center gap-2">
                      <Smartphone className="w-5 h-5" />
                      <div>
                        <p className="font-medium">M-Pesa</p>
                        <p className="text-sm text-muted-foreground">Mobile money payment</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === 'mpesa' && (
                <div>
                  <Label htmlFor="phone">M-Pesa Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="254712345678"
                    value={mpesaPhone}
                    onChange={(e) => setMpesaPhone(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter your number in international format (e.g., 254712345678)
                  </p>
                </div>
              )}

              {paymentMethod === 'stripe' ? (
                <StripeCheckout
                  courseId={course._id}
                  courseName={course.title}
                  price={course.price}
                  currency={course.currency || 'usd'}
                />
              ) : (
                <NeonButton 
                  onClick={handleMpesaPayment} 
                  variant="yellow"
                  className="w-full" 
                  disabled={loading || !mpesaPhone}
                >
                  {loading ? 'Processing...' : `Pay ${course.currency || 'KES'} ${course.price.toFixed(2)}`}
                </NeonButton>
              )}

              <p className="text-xs text-muted-foreground text-center">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
  );
};

export default Checkout;