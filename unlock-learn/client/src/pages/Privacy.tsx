// ...existing code...
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiCall from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Layout from '@/components/Layout';
import { toast } from '@/hooks/use-toast';
import { Download, Trash2, Edit, Shield } from 'lucide-react';

const Privacy = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: requests, isLoading } = useQuery({
    queryKey: ['privacy-requests', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const resp = await apiCall(
        `/privacy-requests?userId=${encodeURIComponent(user.id)}&order=created_at.desc`
      );
      return Array.isArray(resp) ? resp : resp ? [resp] : [];
    },
    enabled: !!user,
  });

  const createRequest = useMutation({
    mutationFn: async (type: 'data_export' | 'data_deletion' | 'data_correction') => {
      if (!user) throw new Error('Not authenticated');

      const resp = await apiCall('/privacy-requests', {
        method: 'POST',
        data: JSON.stringify({
          user_id: user.id,
          request_type: type,
          status: 'pending',
        }),
      });

      // backend may return created resource or object with data/error
      const created = resp?.data ?? resp;
      if (!created) throw new Error('Failed to create request');
      return created;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['privacy-requests', user?.id] });
      toast({
        title: 'Request submitted',
        description: 'Your privacy request has been submitted and will be processed soon.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Request failed',
        description: error?.message || 'Failed to submit request',
        variant: 'destructive',
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'processing':
        return 'bg-blue-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-12">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>Please sign in to access your privacy dashboard</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{t('privacy.title')}</h1>
            <p className="text-[var(--muted)]">{t('privacy.subtitle')}</p>
          </div>

          <div className="grid gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  <CardTitle>{t('privacy.dataExport.title')}</CardTitle>
                </div>
                <CardDescription>{t('privacy.dataExport.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => createRequest.mutate('data_export')}
                  disabled={createRequest.isPending}
                >
                  {t('privacy.dataExport.button')}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Edit className="w-5 h-5" />
                  <CardTitle>{t('privacy.dataCorrection.title')}</CardTitle>
                </div>
                <CardDescription>{t('privacy.dataCorrection.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  onClick={() => createRequest.mutate('data_correction')}
                  disabled={createRequest.isPending}
                >
                  {t('privacy.dataCorrection.button')}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-destructive">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trash2 className="w-5 h-5 text-destructive" />
                  <CardTitle className="text-destructive">{t('privacy.dataDeletion.title')}</CardTitle>
                </div>
                <CardDescription>{t('privacy.dataDeletion.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">{t('privacy.dataDeletion.button')}</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        {t('privacy.dataDeletion.warning')}. This will permanently delete your account and all your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => createRequest.mutate('data_deletion')}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {t('common.confirm')}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <CardTitle>{t('privacy.requests.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>{t('common.loading')}</p>
              ) : requests && requests.length > 0 ? (
                <div className="space-y-4">
                  {requests.map((request: any) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium capitalize">
                          {String(request.request_type).replace('_', ' ')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(request.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {t(`privacy.requests.status.${request.status}`)}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">{t('privacy.requests.noRequests')}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </Layout>
  );
};

export default Privacy;