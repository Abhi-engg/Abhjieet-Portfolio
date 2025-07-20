import { Download, FileText, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="min-h-screen py-4 sm:py-6 md:py-12">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 space-y-4 sm:space-y-6 md:space-y-10">
        {/* Header Section */}
        <CardContent className="p-4 sm:p-6 md:p-16 text-center rounded-xl sm:rounded-2xl bg-background/50 backdrop-blur-sm">
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 tracking-tight">
              My Resume
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
              View and download my professional resume to learn more about my experience, skills, and background.
            </p>
          </div>
          <div className="w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-primary/80 mx-auto"></div>
        </CardContent>

        {/* PDF Preview Section */}
        <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="bg-muted/20 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4">
              <div className="aspect-[8.5/11] bg-background rounded-lg shadow-inner flex items-center justify-center overflow-hidden">
                <object
                  data={resumePdfPath}
                  type="application/pdf"
                  className="w-full h-full rounded-lg"
                >
                  <div className="flex flex-col items-center justify-center h-full text-center p-3 sm:p-4 md:p-8 space-y-3 sm:space-y-4 md:space-y-6">
                    <FileText className="h-8 sm:h-12 md:h-20 w-8 sm:w-12 md:w-20 text-muted-foreground" />
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                      PDF preview not available in this browser.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleView} 
                      className="flex items-center gap-1.5 text-xs sm:text-sm"
                    >
                      <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                      Open in New Tab
                    </Button>
                  </div>
                </object>
              </div>

              <div className="mt-2 sm:mt-3 md:mt-4 text-center">
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground px-2">
                  PDF preview works best on desktop. Use the buttons below to view or download.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Actions */}
        <div className="text-center pb-2 sm:pb-4 md:pb-8">
          <div className="flex flex-col sm:flex-row sm:inline-flex gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4 bg-muted/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleView} 
              className="flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-primary/10 w-full sm:w-auto text-xs sm:text-sm"
            >
              <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              View Full Size
            </Button>
            <Button 
              size="sm" 
              onClick={handleDownload} 
              className="flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg w-full sm:w-auto text-xs sm:text-sm"
            >
              <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
