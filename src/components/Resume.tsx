import { Download, FileText, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import resumePdf from "@/assets/Abhijeet's.pdf";

const Resume = () => {
  const resumePdfPath = resumePdf;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumePdfPath;
    link.download = "Abhijeet-Yadav-Resume.pdf";
    link.click();
  };

  return (
    <section
      id="resume"
      className="min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6"
    >
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 md:space-y-10">
        {/* Header Section */}
        <div className="text-center space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            My Resume
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm sm:text-base md:text-lg">
            View and download my professional resume to learn more about my
            experience, skills, and background.
          </p>
          <div className="w-16 sm:w-20 h-1 bg-primary/80 mx-auto rounded-full"></div>
        </div>

        {/* PDF Preview Section */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="bg-muted/10 rounded-xl p-2 sm:p-4 md:p-6">
              {/* Desktop Preview */}
              <div className="hidden md:block aspect-[8.5/11] bg-background rounded-lg shadow-inner">
                <object
                  data={resumePdfPath}
                  type="application/pdf"
                  className="w-full h-full rounded-lg"
                >
                  <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4">
                    <FileText className="h-16 w-16 text-muted-foreground animate-pulse" />
                    <p className="text-muted-foreground">
                      PDF preview not available. Please use the buttons below.
                    </p>
                  </div>
                </object>
              </div>

              {/* Mobile Preview */}
              <div className="md:hidden aspect-[3/4] bg-background rounded-lg shadow-inner flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                  <FileText className="h-20 w-20 mx-auto text-muted-foreground animate-pulse" />
                  <p className="text-sm text-muted-foreground">
                    Use the buttons below to view or download the resume
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 p-4 rounded-xl">
          {/* View Button */}
          <Button
            size="lg"
            asChild
            className="w-full sm:w-auto min-w-[200px] group relative overflow-hidden"
          >
            <a
              href={resumePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-2 px-4 hover:scale-105 transition-all duration-300 hover:shadow-lg"
            >
              <Eye className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>View Resume</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
          </Button>

          {/* Download Button */}
          <Button
            size="lg"
            onClick={handleDownload}
            className="w-full sm:w-auto min-w-[200px] group relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-2 px-4 hover:scale-105 transition-all duration-300 hover:shadow-lg"
          >
            <Download className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Download Resume</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Button>
        </div>

        {/* Mobile Note */}
        <p className="text-center text-sm text-muted-foreground md:hidden">
          💡 Tip: Download the resume for the best viewing experience on mobile
        </p>
      </div>
    </section>
  );
};

export default Resume;
