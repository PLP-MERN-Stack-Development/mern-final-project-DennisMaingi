import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface CoursePaymentButtonProps {
  courseId: string;
  price: number;
  currency?: string;
  enrolled?: boolean;
}

export const CoursePaymentButton = ({ 
  courseId, 
  price, 
  currency = 'USD',
  enrolled = false 
}: CoursePaymentButtonProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleEnroll = () => {
    if (!user) {
      toast.error('Please sign in to enroll');
      navigate('/auth');
      return;
    }

    if (price === 0) {
      // Free course - enroll directly
      toast.success('Enrolled successfully!');
      navigate(`/learn/${courseId}`);
    } else {
      // Paid course - go to checkout
      navigate(`/checkout?courseId=${courseId}`);
    }
  };

  if (enrolled) {
    return (
      <Button onClick={() => navigate(`/learn/${courseId}`)} className="w-full">
        Continue Learning
      </Button>
    );
  }

  return (
    <Button onClick={handleEnroll} className="w-full">
      {price === 0 ? 'Enroll Free' : `Enroll - ${currency} ${price}`}
    </Button>
  );
};
