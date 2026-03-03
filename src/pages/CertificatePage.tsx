import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourses } from "@/contexts/CoursesContext";
import { useEnrollment } from "@/contexts/EnrollmentContext";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Award, Download, Share2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CertificatePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses } = useCourses();
  const { enrollments } = useEnrollment();
  const { user } = useAuth();
  
  const course = courses.find((c) => c.id === courseId);
  const enrollment = enrollments.find((e) => e.courseId === courseId);
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!course || !enrollment || !enrollment.completed) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <Award className="h-16 w-16 text-muted-foreground mb-4 opacity-20" />
        <h2 className="text-2xl font-bold">Certificate Not Available</h2>
        <p className="text-muted-foreground mt-2 max-w-sm">
          You need to complete the course and pass the assessment to earn your certificate.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => navigate("/courses")}>
          Back to Courses
        </Button>
      </div>
    );
  }

  const completionDate = new Date(enrollment.enrolledAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDownloadPdf = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // Increase scale for better resolution
        useCORS: true, // If images are hosted on a different domain
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4", // A4 aspect ratio is approx 1.414, which matches the certificate UI
      });

      const imgWidth = 297; // A4 landscape width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${user?.name || "User"}_Certificate_${course.title}.pdf`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <Button variant="ghost" className="mb-8" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="mx-auto w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center"
            >
              <Award className="h-10 w-10 text-accent" />
            </motion.div>
            <h1 className="text-4xl font-extrabold tracking-tight font-display">Congratulations, {user?.name}!</h1>
            <p className="text-xl text-muted-foreground">You've successfully mastered {course.title}</p>
          </div>

          {/* Certificate UI */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-accent/20 blur-[100px] -z-10 rounded-full" />
            <div 
              ref={certificateRef}
              className="aspect-[1.414/1] w-full bg-card border-[16px] border-double border-accent/30 p-12 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-2xl rounded-sm"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-accent opacity-50" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-accent opacity-50" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 mb-8">
                  <div className="bg-accent p-1.5 rounded">
                    <Award className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <span className="text-2xl font-black tracking-tighter uppercase font-display">LearnHub</span>
                </div>
                <h2 className="text-xl font-medium tracking-[0.2em] uppercase text-muted-foreground">Certificate of Completion</h2>
                <div className="w-24 h-1 bg-accent mx-auto" />
              </div>

              <div className="space-y-6">
                <p className="text-lg italic text-muted-foreground">This is to certify that</p>
                <h3 className="text-5xl font-bold font-display text-foreground border-b-2 border-border pb-2 inline-block">
                  {user?.name}
                </h3>
                <p className="text-lg text-muted-foreground max-w-lg">
                  has successfully completed the professional course on <br />
                  <span className="font-bold text-foreground">"{course.title}"</span>
                </p>
              </div>

              <div className="grid grid-cols-2 w-full pt-12">
                <div className="text-left">
                  <p className="text-sm text-muted-foreground uppercase tracking-widest">Date</p>
                  <p className="font-bold">{completionDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground uppercase tracking-widest">Certificate ID</p>
                  <p className="font-bold">LH-{course.id.substring(0,4).toUpperCase()}-{Math.floor(Math.random() * 90000 + 10000)}</p>
                </div>
              </div>
              
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-10">
                <Award className="h-64 w-64" />
              </div>
            </div>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleDownloadPdf}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share Achievement
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CertificatePage;
