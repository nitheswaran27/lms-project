import React, { useState } from "react";
import { useCourses } from "@/contexts/CoursesContext";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

const Courses = () => {
  const { courses } = useCourses();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(courses.map((c) => c.category))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
                          course.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || course.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">Explore Courses</h1>
            <p className="mt-2 text-muted-foreground">Choose from a wide variety of expert-led courses.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="relative w-full sm:w-40">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-muted p-6 rounded-full mb-4">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">No courses found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filter.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;
