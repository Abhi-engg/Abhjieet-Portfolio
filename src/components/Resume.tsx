import { Download, FileText, Eye } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Resume = () => {
  const resumePdfPath = "/src/assets/resume.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumePdfPath;
    link.download = "resume.pdf";
    link.click();
  };

  const handleView = () => {
    window.open(resumePdfPath, "_blank");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">

        {/* Header Section */}
          <CardContent className="p-16 text-center">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">My Resume</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                View and download my professional resume to learn more about my experience, skills, and background.
              </p>
            </div>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </CardContent>
        

        {/* PDF Preview Section */}
        <Card className="shadow-soft">
          
          <CardContent>
            <div className="bg-muted/30 rounded-lg p-3">
              <div className=" aspect-[8.5/11] bg-background rounded-lg shadow-inner flex items-center justify-center">
                <object
                  data={resumePdfPath}
                  type="application/pdf"
                  className="w-full h-full rounded-lg"
                >
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <FileText className="h-24 w-24 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">
                      PDF preview not available in this browser.
                    </p>
                    <Button variant="outline" onClick={handleView} className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Open in New Tab
                    </Button>
                  </div>
                </object>
              </div>

              <div className="mt-4 text-center md:hidden">
                <p className="text-sm text-muted-foreground mb-3">
                  PDF preview works best on desktop. Use the buttons above to view or download.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Actions */}
        <div className="text-center">
          <div className="inline-flex gap-3 p-4 bg-muted/30 rounded-lg">
            <Button variant="ghost" size="sm" onClick={handleView} className="flex items-center gap-2">
              <Eye className="h-3 w-3" />
              View Full Size
            </Button>
            <Button size="sm" onClick={handleDownload} className="bg-gradient-primary hover:opacity-90 transition-opacity flex items-center gap-2">
              <Download className="h-3 w-3" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
