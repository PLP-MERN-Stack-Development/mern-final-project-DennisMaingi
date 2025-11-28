import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">Choose the plan that works for you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">Free</CardTitle>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mt-4">$0</div>
              <p className="text-gray-600 dark:text-gray-400">Forever</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  Access to free courses
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  Basic features
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  Community support
                </li>
              </ul>
              <Button onClick={() => navigate('/auth')} className="w-full">Get Started</Button>
            </CardContent>
          </Card>

          {/* Individual Plan */}
          <Card className="border-2 border-blue-500 dark:border-blue-400 bg-white dark:bg-gray-800 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">Popular</span>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">Individual</CardTitle>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mt-4">$29</div>
              <p className="text-gray-600 dark:text-gray-400">Per month</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  All free features
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  Access to all courses
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  Certificates
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  Priority support
                </li>
              </ul>
              <Button onClick={() => navigate('/courses')} className="w-full bg-blue-600 hover:bg-blue-700">Choose Plan</Button>
            </CardContent>
          </Card>

          {/* Team Plan */}
          <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">Team</CardTitle>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mt-4">$99</div>
              <p className="text-gray-600 dark:text-gray-400">Per month</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  All individual features
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  Up to 10 team members
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  Team analytics
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  Dedicated support
                </li>
              </ul>
              <Button onClick={() => navigate('/contact')} variant="outline" className="w-full">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
