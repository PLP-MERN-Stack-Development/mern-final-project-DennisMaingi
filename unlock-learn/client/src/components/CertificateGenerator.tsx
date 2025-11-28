import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function CertificateGenerator({ studentName, courseName, completionDate, certificateId }) {
  const certRef = useRef(null);

  const downloadCertificate = () => {
    const element = certRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 1200;
    canvas.height = 800;
    
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 20;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
    
    // Title
    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Completion', canvas.width / 2, 150);
    
    // Student name
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 48px Arial';
    ctx.fillText(studentName, canvas.width / 2, 300);
    
    // Course name
    ctx.font = '32px Arial';
    ctx.fillText(`has successfully completed`, canvas.width / 2, 380);
    ctx.font = 'bold 40px Arial';
    ctx.fillStyle = '#2563eb';
    ctx.fillText(courseName, canvas.width / 2, 450);
    
    // Date
    ctx.fillStyle = '#000000';
    ctx.font = '24px Arial';
    ctx.fillText(`Completion Date: ${new Date(completionDate).toLocaleDateString()}`, canvas.width / 2, 550);
    
    // Certificate ID
    ctx.font = '18px Arial';
    ctx.fillStyle = '#666666';
    ctx.fillText(`Certificate ID: ${certificateId}`, canvas.width / 2, 700);
    
    // Download
    const link = document.createElement('a');
    link.download = `certificate-${certificateId}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div>
      <div ref={certRef} className="bg-white p-12 border-8 border-blue-600 rounded-lg text-center">
        <h1 className="text-5xl font-bold text-blue-900 mb-8">Certificate of Completion</h1>
        <p className="text-3xl font-bold mb-4">{studentName}</p>
        <p className="text-xl mb-2">has successfully completed</p>
        <p className="text-2xl font-bold text-blue-600 mb-8">{courseName}</p>
        <p className="text-lg">Completion Date: {new Date(completionDate).toLocaleDateString()}</p>
        <p className="text-sm text-gray-600 mt-8">Certificate ID: {certificateId}</p>
      </div>
      <Button onClick={downloadCertificate} className="mt-4 w-full">
        <Download className="w-4 h-4 mr-2" />
        Download Certificate
      </Button>
    </div>
  );
}
