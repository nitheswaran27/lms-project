import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import axios from "axios";
import { type Course } from "@/data/courses";

interface CoursesContextType {
  courses: Course[];
  addCourse: (course: Course) => void;
  loading: boolean;
  error: string | null;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses");
        setCourses(response.data);
      } catch (err) {
        setError("Failed to fetch courses.");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const addCourse = (course: Course) => {
    // For now, this still updates the local state.
    // In a full backend integration, this would involve a POST request to the backend.
    const updated = [...courses, course];
    setCourses(updated);
    // localStorage.setItem("lms_courses", JSON.stringify(updated)); // Remove local storage update for adding
  };

  return (
    <CoursesContext.Provider value={{ courses, addCourse, loading, error }}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => {
  const ctx = useContext(CoursesContext);
  if (!ctx) throw new Error("useCourses must be used within CoursesProvider");
  return ctx;
};
