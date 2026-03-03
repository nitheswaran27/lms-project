import React, { createContext, useContext, useState, ReactNode } from "react";

interface Enrollment {
  courseId: string;
  enrolledAt: string;
  progress: number; // 0 to 100
  completed: boolean;
  score?: number;
}

interface EnrollmentContextType {
  enrollments: Enrollment[];
  enroll: (courseId: string) => void;
  updateProgress: (courseId: string, progress: number) => void;
  completeCourse: (courseId: string, score: number) => void;
  isEnrolled: (courseId: string) => boolean;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const EnrollmentProvider = ({ children }: { children: ReactNode }) => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => {
    const stored = localStorage.getItem("lms_enrollments");
    return stored ? JSON.parse(stored) : [];
  });

  const enroll = (courseId: string) => {
    if (enrollments.find((e) => e.courseId === courseId)) return;
    const newEnrollment: Enrollment = {
      courseId,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      completed: false,
    };
    const updated = [...enrollments, newEnrollment];
    setEnrollments(updated);
    localStorage.setItem("lms_enrollments", JSON.stringify(updated));
  };

  const updateProgress = (courseId: string, progress: number) => {
    const updated = enrollments.map((e) =>
      e.courseId === courseId ? { ...e, progress: Math.max(e.progress, progress) } : e
    );
    setEnrollments(updated);
    localStorage.setItem("lms_enrollments", JSON.stringify(updated));
  };

  const completeCourse = (courseId: string, score: number) => {
    const updated = enrollments.map((e) =>
      e.courseId === courseId ? { ...e, completed: true, score, progress: 100 } : e
    );
    setEnrollments(updated);
    localStorage.setItem("lms_enrollments", JSON.stringify(updated));
  };

  const isEnrolled = (courseId: string) => {
    return !!enrollments.find((e) => e.courseId === courseId);
  };

  return (
    <EnrollmentContext.Provider value={{ enrollments, enroll, updateProgress, completeCourse, isEnrolled }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollment = () => {
  const ctx = useContext(EnrollmentContext);
  if (!ctx) throw new Error("useEnrollment must be used within EnrollmentProvider");
  return ctx;
};
