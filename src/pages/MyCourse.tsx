import { useCourses } from "@/contexts/CoursesContext";
import { useEnrollment } from "@/contexts/EnrollmentContext";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MyCourse = () => {
  const { courses } = useCourses();
  const { enrollments } = useEnrollment();

  const enrolledCourses = enrollments.map(e => {
    const course = courses.find(c => c.id === e.courseId);
    return course ? { ...course, enrollment: e } : null;
  }).filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold font-display">My Learning</h1>
          <p className="text-muted-foreground mt-2">Track your progress and continue where you left off.</p>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course: any) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-xl">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">No courses enrolled yet</h3>
            <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
              Explore our catalog and start your learning journey today.
            </p>
            <Link to="/courses">
              <Button variant="accent">Explore Courses</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyCourse;
