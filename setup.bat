@echo off
echo Creating LMS Folder Structure...

REM PUBLIC FILES
type nul > public\favicon.ico
type nul > public\placeholder.svg
type nul > public\robots.txt

REM SRC FOLDERS
mkdir src\assets
mkdir src\components
mkdir src\components\ui
mkdir src\contexts
mkdir src\data
mkdir src\hooks
mkdir src\lib
mkdir src\pages
mkdir src\test

REM ASSETS
type nul > src\assets\hero-bg.jpg

REM UI COMPONENTS
cd src\components\ui

type nul > accordion.tsx
type nul > alert-dialog.tsx
type nul > alert.tsx
type nul > aspect-ratio.tsx
type nul > avatar.tsx
type nul > badge.tsx
type nul > breadcrumb.tsx
type nul > button.tsx
type nul > calendar.tsx
type nul > card.tsx
type nul > carousel.tsx
type nul > chart.tsx
type nul > checkbox.tsx
type nul > collapsible.tsx
type nul > command.tsx
type nul > context-menu.tsx
type nul > dialog.tsx
type nul > drawer.tsx
type nul > dropdown-menu.tsx
type nul > form.tsx
type nul > hover-card.tsx
type nul > input-otp.tsx
type nul > input.tsx
type nul > label.tsx
type nul > menubar.tsx
type nul > navigation-menu.tsx
type nul > pagination.tsx
type nul > popover.tsx
type nul > progress.tsx
type nul > radio-group.tsx
type nul > resizable.tsx
type nul > scroll-area.tsx
type nul > select.tsx
type nul > separator.tsx
type nul > sheet.tsx
type nul > sidebar.tsx
type nul > skeleton.tsx
type nul > slider.tsx
type nul > sonner.tsx
type nul > switch.tsx
type nul > table.tsx
type nul > tabs.tsx
type nul > textarea.tsx
type nul > toast.tsx
type nul > toaster.tsx
type nul > toggle-group.tsx
type nul > toggle.tsx
type nul > tooltip.tsx
type nul > use-toast.ts

cd ..\..

REM MAIN COMPONENT FILES
type nul > src\components\CourseCard.tsx
type nul > src\components\Navbar.tsx
type nul > src\components\NavLink.tsx
type nul > src\components\ProtectedRoute.tsx
type nul > src\components\Quiz.tsx
type nul > src\components\VideoPlayer.tsx

REM CONTEXTS
type nul > src\contexts\AuthContext.tsx
type nul > src\contexts\CoursesContext.tsx
type nul > src\contexts\EnrollmentContext.tsx

REM DATA
type nul > src\data\courses.ts

REM HOOKS
type nul > src\hooks\use-mobile.tsx
type nul > src\hooks\use-toast.ts

REM LIB
type nul > src\lib\utils.ts

REM PAGES
type nul > src\pages\AdminDashboard.tsx
type nul > src\pages\AdminLogin.tsx
type nul > src\pages\CertificatePage.tsx
type nul > src\pages\CourseDetail.tsx
type nul > src\pages\Courses.tsx
type nul > src\pages\Index.tsx
type nul > src\pages\MyCourse.tsx
type nul > src\pages\NotFound.tsx
type nul > src\pages\StudentLogin.tsx
type nul > src\pages\StudentRegister.tsx

REM TEST
type nul > src\test\example.test.ts
type nul > src\test\setup.ts

echo.
echo LMS Structure Created Successfully!
pause
