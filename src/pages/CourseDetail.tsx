import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourses } from "@/contexts/CoursesContext";
import { useEnrollment } from "@/contexts/EnrollmentContext";
import Navbar from "@/components/Navbar";
import VideoPlayer from "@/components/VideoPlayer";
import Quiz from "@/components/Quiz";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, FileText, Award, Clock, BookOpen, CheckCircle } from "lucide-react";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses } = useCourses();
  const { enroll, enrollments, updateProgress, completeCourse, isEnrolled } = useEnrollment();
  
  const course = courses.find((c) => c.id === id);
  const enrollment = enrollments.find((e) => e.courseId === id);
  
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!course) return;
    if (!isEnrolled(course.id)) {
      enroll(course.id);
    }
  }, [course, id, isEnrolled, enroll]);

  if (!course) return <div>Course not found</div>;

  const handleProgressUpdate = (progress: number) => {
    updateProgress(course.id, progress);
  };

  const handleQuizComplete = (score: number) => {
    completeCourse(course.id, score);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="bg-accent/10 text-accent px-2 py-0.5 rounded font-medium">{course.category}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {Math.round(course.videoDuration/60)}m</span>
                <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {course.questions.length} questions</span>
              </div>
            </div>

            <VideoPlayer 
              url={course.videoUrl} 
              onProgress={handleProgressUpdate}
              onEnded={() => updateProgress(course.id, 100)}
            />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="content">Course Content</TabsTrigger>
                <TabsTrigger value="quiz">Assessment</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6 space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">About this course</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {course.longDescription}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="content" className="mt-6">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border bg-accent/5 border-accent/20">
                      <div className="flex items-center gap-3">
                        <div className="bg-accent rounded-full p-2">
                          <PlayCircle className="h-5 w-5 text-accent-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">Video Lesson: Introduction</p>
                          <p className="text-xs text-muted-foreground">{Math.round(course.videoDuration/60)}:00</p>
                        </div>
                      </div>
                      {enrollment?.progress === 100 && <CheckCircle className="h-5 w-5 text-accent" />}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="quiz" className="mt-6">
                {enrollment?.progress && enrollment.progress >= 90 ? (
                  <Quiz questions={course.questions} onComplete={handleQuizComplete} />
                ) : (
                  <Card className="text-center py-12">
                    <CardContent className="space-y-4">
                      <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-bold">Quiz Locked</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        Please watch at least 90% of the course video to unlock the assessment.
                      </p>
                      <Button variant="outline" onClick={() => setActiveTab("overview")}>
                        Go back to learning
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-accent/20">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Your Progress</span>
                    <span className="text-accent font-bold">{Math.round(enrollment?.progress || 0)}%</span>
                  </div>
                  <Progress value={enrollment?.progress || 0} className="h-2" />
                </div>
                
                {enrollment?.completed ? (
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => navigate(`/certificate/${course.id}`)}>
                    <Award className="mr-2 h-4 w-4" />
                    View Certificate
                  </Button>
                ) : (
                  <div className="p-4 rounded-lg bg-muted text-sm text-center">
                    Complete the video and pass the quiz to earn your certificate!
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-bold mb-4">Course Highlights</h4>
                <ul className="space-y-3">
                  {[
                    "Self-paced learning",
                    "Certificate of completion",
                    "Expert-led instruction",
                    "Interactive assessment"
                  ].map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
