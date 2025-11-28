import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export const GoogleAuthButton = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const { data } = await api.post('/auth/google', {
        credential: credentialResponse.credential,
      });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast.success('Signed in with Google!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Google auth error:', error);
      toast.error(error.response?.data?.message || 'Google sign-in failed');
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => toast.error('Google sign-in failed')}
      useOneTap
    />
  );
};
