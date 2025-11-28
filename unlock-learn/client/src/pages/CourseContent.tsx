import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, Video, Download } from 'lucide-react';
import apiCall from '@/lib/api';

export default function CourseContent() {
  const { id } = useParams();
  const [content, setContent] = useState([]);
  const [resources, setResources] = useState([]);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    fetchContent();
  }, [id]);

  const fetchContent = async () => {
    try {
      const { data } = await apiCall.get(`/courses/${id}/content`);
      setContent(data.content || []);
      setResources(data.resources || []);
      setProgress(data.progress || 0);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const markComplete = async (contentId) => {
    try {
      const { data } = await apiCall.post(`/courses/${id}/content/${contentId}/complete`);
      setProgress(data.progress);
      setCompleted([...completed, contentId]);
      if (data.completed) {
        alert('Congratulations! Course completed. Download your certificate!');
      }
    } catch (error) {
      console.error('Error marking complete:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Course Content</h1>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="mt-2 text-gray-600">{progress}% Complete</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Lessons</h2>
            {content.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {item.type === 'video' && <Video className="w-5 h-5" />}
                    {item.type === 'pdf' && <FileText className="w-5 h-5" />}
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {item.type === 'video' && item.url && (
                    <video controls className="w-full rounded-lg mb-4">
                      <source src={item.url} type="video/mp4" />
                    </video>
                  )}
                  {item.type === 'pdf' && item.url && (
                    <div className="space-y-2">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        View PDF
                      </a>
                      <a href={item.url} download className="ml-4 text-green-600 hover:underline inline-flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </a>
                    </div>
                  )}
                  <Button onClick={() => markComplete(item._id)} className="mt-4">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Complete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {resources.map((resource, index) => (
                  <a key={index} href={resource.url} download target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Download className="w-4 h-4" />
                    <div>
                      <p className="font-semibold">{resource.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{resource.type} - {resource.size}</p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {progress === 100 && (
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <Button className="w-full" onClick={() => window.open(`/api/courses/${id}/certificate`, '_blank')}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
