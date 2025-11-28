import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Accessibility = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Accessibility Statement</h1>
        
        <Card className="mb-6 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Our Commitment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">Unlock Learn is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.</p>
          </CardContent>
        </Card>

        <Card className="mb-6 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">WCAG 2.1 AA Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">Our platform conforms to WCAG 2.1 Level AA standards, including screen reader support, keyboard navigation, and high contrast modes.</p>
          </CardContent>
        </Card>

        <Card className="mb-6 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Features</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>Screen reader compatibility</li>
              <li>Keyboard navigation support</li>
              <li>Video captions and transcripts</li>
              <li>Text-to-speech functionality</li>
              <li>Adjustable font sizes</li>
              <li>High contrast mode</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">We welcome feedback on accessibility. Contact us at accessibility@unlocklearn.com</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Accessibility;
