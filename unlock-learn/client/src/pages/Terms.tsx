import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p>By accessing and using Unlock Learn, you accept and agree to be bound by these Terms of Service.</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. Use of Service</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You may use our service for lawful purposes only. You agree not to use the service to violate any laws or regulations.</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. Course Access</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Paid courses grant lifetime access. Free courses are available to all registered users.</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>4. Refund Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Refunds are available within 30 days of purchase if you're not satisfied with the course.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <p>For questions about these terms, contact us at support@unlocklearn.com</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Terms;
