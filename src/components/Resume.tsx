import { Download, FileText, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Resume = () => {
  const resumePdfPath = "/src/assets/resume.pdf"; // Ensure this is hosted properly in `public/` folder for Vite

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumePdfPath;
    link.download = "Abhijeet-Yadav-Resume.pdf";
    link.click();
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header Section */}
        <CardContent className="p-6 sm:p-8 md:p-16 text-center rounded-2xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              My Resume
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
              View and download my professional resume to learn more about my experience, skills, and background.
            </p>
          </div>
          <div className="w-20 h-1 bg-primary/80 mx-auto"></div>
        </CardContent>

        {/* PDF Preview Section */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-4 sm:p-6">
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
                  PDF preview works best on desktop. Use the buttons below to view or download.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View + Download Buttons */}
        <div className="text-center pb-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 p-4 bg-muted/20 rounded-xl">
            {/* View Button */}
            <Button
              size="sm"
              asChild
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
            >
              <a href={resumePdfPath} target="_blank" rel="noopener noreferrer">
                <Eye className="h-4 w-4" />
                View PDF
              </a>
            </Button>

            {/* Download Button */}
            <Button
              size="sm"
              onClick={handleDownload}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
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
