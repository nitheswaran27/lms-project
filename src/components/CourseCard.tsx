import { Link } from "react-router-dom";
import { type Course } from "@/data/courses";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, BookOpen } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover border-border bg-card">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="accent" className="font-semibold uppercase tracking-wider text-[10px]">
            {course.category}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-5 pb-2">
        <CardTitle className="line-clamp-1 text-xl font-bold">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2 mt-2 h-10 text-sm leading-relaxed">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {Math.round(course.videoDuration / 60) || 1} min
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.questions.length} Questions
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Link to={`/course/${course.id}`} className="w-full">
          <Button variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent">
            <PlayCircle className="mr-2 h-4 w-4" />
            View Course
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
