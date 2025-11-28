import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import apiCall from '@/lib/api'; // Adjust the import path if necessary
import { toast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m your learning assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response with helpful educational content
    setTimeout(() => {
      let response = '';
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('course') || lowerMessage.includes('learn')) {
        response = 'We offer a wide range of technology courses including Web Development, Python, React, Data Science, and more! You can browse all courses on our Courses page. Would you like me to help you find a specific course?';
      } else if (lowerMessage.includes('free')) {
        response = 'Yes! We have free courses available including Introduction to Programming, HTML & CSS Basics, and Git & Version Control. These are perfect for beginners to start their learning journey!';
      } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        response = 'Our premium courses range from $49.99 to $139.99. We also offer free courses to get you started. Check out our Pricing page for detailed information about our plans!';
      } else if (lowerMessage.includes('certificate')) {
        response = 'Yes! Upon completing any course, you will receive a certificate of completion that you can share on LinkedIn and add to your resume.';
      } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
        response = 'I\'m here to help! You can ask me about our courses, pricing, accessibility features, or anything else. You can also visit our Support page for more detailed assistance.';
      } else if (lowerMessage.includes('accessibility')) {
        response = 'Our platform is fully accessible with WCAG 2.1 AA compliance, screen reader support, keyboard navigation, video captions, and text-to-speech. We\'re committed to inclusive education for all!';
      } else {
        response = `Thanks for your question! I can help you with information about our courses, pricing, accessibility features, and more. Feel free to ask me anything about Inclusive Learning!`;
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-16 w-16 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-110 transition-all duration-300"
          size="icon"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-8 w-8 text-white" />
        </Button>
      ) : (
    <Card className="w-[90vw] sm:w-[280px] max-w-sm shadow-2xl border-2 border-gray-300 bg-white" style={{backgroundColor: 'white'}}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4" style={{backgroundColor: 'white'}}>
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-black" />
          <CardTitle className="text-lg text-black">Learning Assistant</CardTitle>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-0" style={{backgroundColor: 'white'}}>
        <div className="h-64 overflow-y-auto px-3" style={{backgroundColor: 'white'}}>
          <div className="space-y-4 py-4" style={{backgroundColor: 'white'}}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-3 max-w-[80%] shadow-sm ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-black border border-gray-200'
                  }`}
                >
                  <p className="text-sm font-semibold" style={{color: message.role === 'user' ? 'white' : 'black'}}>{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-black" />
                </div>
                <div className="rounded-lg px-4 py-2 bg-gray-100">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-black animate-bounce" />
                    <div className="h-2 w-2 rounded-full bg-black animate-bounce delay-75" />
                    <div className="h-2 w-2 rounded-full bg-black animate-bounce delay-150" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4" style={{backgroundColor: 'white'}}>
        <div className="flex gap-2 w-full">
          <Input
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            disabled={isLoading}
          />
          <Button onClick={sendMessage} disabled={isLoading} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
      )}
    </div>
  );
};