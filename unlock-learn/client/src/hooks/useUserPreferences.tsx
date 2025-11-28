import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiCall from '@/lib/api'; // Adjust the import path if necessary
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export const useUserPreferences = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: preferences, isLoading } = useQuery({
    queryKey: ['user-preferences', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const data = await apiCall(`/user_preferences?user_id=${user.id}`); // Adjust the endpoint as necessary
      return data;
    },
    enabled: !!user,
  });

  const updatePreferences = useMutation({
    mutationFn: async (updates: any) => {
      if (!user) throw new Error('Not authenticated');

      const data = await apiCall('/user_preferences', {
        method: 'POST',
        data: JSON.stringify({
          user_id: user.id,
          ...updates,
        }),
      }); // Adjust the endpoint as necessary

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-preferences'] });
      toast({
        title: 'Settings updated',
        description: 'Your preferences have been saved successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Update failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    preferences,
    isLoading,
    updatePreferences: updatePreferences.mutate,
    isUpdating: updatePreferences.isPending,
  };
};