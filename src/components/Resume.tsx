import { Download, FileText } from "lucide-react"; // Remove Eye import
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

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        {/* Header Section */}
        <CardContent className="p-8 md:p-16 text-center rounded-2xl ">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              My Resume
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              View and download my professional resume to learn more about my experience, skills, and background.
            </p>
          </div>
          <div className="w-20 h-1 bg-primary/80 mx-auto"></div>
        </CardContent>

        {/* PDF Preview Section */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="bg-muted/20 rounded-xl p-4">
              <div className="aspect-[8.5/11] bg-background rounded-lg shadow-inner flex items-center justify-center overflow-hidden">
                <object
                  data={resumePdfPath}
                  type="application/pdf"
                  className="w-full h-full rounded-lg"
                >
                  <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-6">
                    <FileText className="h-20 w-20 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      PDF preview not available in this browser.
                    </p>
                  </div>
                </object>
              </div>

              <div className="mt-4 text-center md:hidden">
                <p className="text-sm text-muted-foreground">
                  PDF preview works best on desktop. Use the download button below.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Actions - Simplified */}
        <div className="text-center pb-8">
          <div className="inline-flex p-4 bg-muted/20 rounded-xl backdrop-blur-sm">
            <Button 
              size="sm" 
              onClick={handleDownload} 
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
