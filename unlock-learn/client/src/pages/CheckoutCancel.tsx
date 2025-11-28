import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { XCircle } from 'lucide-react';

const CheckoutCancel = () => {
  const navigate = useNavigate();

  return (
    <Layout className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
            <CardTitle className="text-center">Payment Cancelled</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p>Your payment was cancelled. No charges were made.</p>
            <div className="flex gap-2">
              <Button onClick={() => navigate('/courses')} variant="outline" className="flex-1">
                Browse Courses
              </Button>
              <Button onClick={() => navigate(-1)} className="flex-1">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CheckoutCancel;
