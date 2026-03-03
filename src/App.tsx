import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CoursesProvider } from './contexts/CoursesContext';
import { EnrollmentProvider } from './contexts/EnrollmentContext';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from "./components/ui/theme-provider";

import Index from './pages/Index';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import StudentLogin from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import MyCourse from './pages/MyCourse';
import CertificatePage from './pages/CertificatePage';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <CoursesProvider>
            <EnrollmentProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/login" element={<StudentLogin />} />
                <Route path="/register" element={<StudentRegister />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                
                {/* Protected Student Routes */}
                <Route path="/course/:id" element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <CourseDetail />
                  </ProtectedRoute>
                } />
                <Route path="/my-courses" element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <MyCourse />
                  </ProtectedRoute>
                } />
                <Route path="/certificate/:courseId" element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <CertificatePage />
                  </ProtectedRoute>
                } />

                {/* Protected Admin Routes */}
                <Route path="/admin-dashboard" element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />

                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </EnrollmentProvider>
          </CoursesProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
