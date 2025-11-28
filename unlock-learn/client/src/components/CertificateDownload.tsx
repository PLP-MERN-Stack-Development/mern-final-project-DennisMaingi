import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Award, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CertificateDownloadProps {
  courseName: string;
  studentName: string;
  completionDate: string;
  certificateNumber: string;
}

export const CertificateDownload = ({
  courseName,
  studentName,
  completionDate,
  certificateNumber,
}: CertificateDownloadProps) => {
  const handleDownload = () => {
    // In a real implementation, this would generate and download a PDF
    alert("Certificate download functionality will be implemented with PDF generation");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Certificate - ${courseName}`,
        text: `I've completed ${courseName} on InclusiveLearn!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      alert("Share link: " + window.location.href);
    }
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="text-center bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="flex justify-center mb-4">
          <Award className="h-20 w-20 text-primary" />
        </div>
        <CardTitle className="text-2xl">Certificate of Completion</CardTitle>
        <CardDescription>Congratulations on completing the course!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="text-center space-y-3 p-6 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">This certifies that</p>
          <p className="text-2xl font-bold">{studentName}</p>
          <p className="text-sm text-muted-foreground">has successfully completed</p>
          <p className="text-xl font-semibold text-primary">{courseName}</p>
          <div className="flex justify-center gap-4 pt-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Completion Date</p>
              <p className="font-medium">{new Date(completionDate).toLocaleDateString()}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Certificate ID</p>
              <Badge variant="outline">{certificateNumber}</Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleDownload} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download Certificate
          </Button>
          <Button onClick={handleShare} variant="outline" className="flex-1">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          This certificate can be verified at verify.inclusivelearn.com/{certificateNumber}
        </p>
      </CardContent>
    </Card>
  );
};