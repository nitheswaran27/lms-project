import { useState } from "react";
import { useCourses } from "@/contexts/CoursesContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Trash2, Edit, BookOpen, Users, PlayCircle, Award } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { courses, addCourse } = useCourses();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Form state for new course
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    longDescription: "",
    videoUrl: "",
    category: "",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
  });

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.description) return;
    
    const course = {
      ...newCourse,
      id: newCourse.title.toLowerCase().replace(/\s+/g, '-'),
      videoDuration: 600,
      questions: [
        { id: "q1", question: "Placeholder Question 1", options: ["A", "B", "C", "D"], correctIndex: 0 }
      ]
    };
    
    addCourse(course);
    setIsAddDialogOpen(false);
    toast({
      title: "Course Added",
      description: `${newCourse.title} has been created successfully.`,
    });
    setNewCourse({
      title: "",
      description: "",
      longDescription: "",
      videoUrl: "",
      category: "",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your courses and platform content.</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Course Title</Label>
                    <Input 
                      value={newCourse.title} 
                      onChange={e => setNewCourse({...newCourse, title: e.target.value})}
                      placeholder="e.g. Advanced React" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input 
                      value={newCourse.category} 
                      onChange={e => setNewCourse({...newCourse, category: e.target.value})}
                      placeholder="e.g. Development" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Short Description</Label>
                  <Input 
                    value={newCourse.description} 
                    onChange={e => setNewCourse({...newCourse, description: e.target.value})}
                    placeholder="Brief summary for course card" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Detailed Content</Label>
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newCourse.longDescription} 
                    onChange={e => setNewCourse({...newCourse, longDescription: e.target.value})}
                    placeholder="Full course details..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Video URL</Label>
                  <Input 
                    value={newCourse.videoUrl} 
                    onChange={e => setNewCourse({...newCourse, videoUrl: e.target.value})}
                    placeholder="https://example.com/video.mp4" 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddCourse}>Create Course</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-4 mb-10">
          {[
            { label: "Total Courses", value: courses.length, icon: BookOpen, color: "text-blue-500" },
            { label: "Total Students", value: "1,248", icon: Users, color: "text-green-500" },
            { label: "Active Lessons", value: "42", icon: PlayCircle, color: "text-orange-500" },
            { label: "Certificates Issued", value: "856", icon: Award, color: "text-yellow-500" },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Courses Table Alternative */}
        <h2 className="text-xl font-bold mb-4">Manage Courses</h2>
        <div className="space-y-4">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row items-center p-4 gap-6">
                <div className="w-full md:w-32 h-20 rounded-lg overflow-hidden shrink-0">
                  <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-lg">{course.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{course.description}</p>
                  <div className="flex gap-4 text-xs">
                    <span className="bg-muted px-2 py-0.5 rounded">{course.category}</span>
                    <span className="text-muted-foreground">{course.questions.length} Questions</span>
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
