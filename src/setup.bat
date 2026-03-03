@echo off
echo Creating LMS Folder Structure...

REM CREATE FOLDERS (Safe)
mkdir src\assets 2>nul
mkdir src\components 2>nul
mkdir src\components\ui 2>nul
mkdir src\contexts 2>nul
mkdir src\data 2>nul
mkdir src\hooks 2>nul
mkdir src\lib 2>nul
mkdir src\pages 2>nul
mkdir src\test 2>nul

REM PUBLIC FILES
type nul > public\favicon.ico
type nul > public\placeholder.svg
type nul > public\robots.txt

REM ASSETS
type nul > src\assets\hero-bg.jpg

REM UI FILES
type nul > src\components\ui\accordion.tsx
type nul > src\components\ui\alert-dialog.tsx
type nul > src\components\ui\alert.tsx
type nul > src\components\ui\aspect-ratio.tsx
type nul > src\components\ui\avatar.tsx
type nul > src\components\ui\badge.tsx
type nul > src\components\ui\breadcrumb.tsx
type nul > src\components\ui\button.tsx
type nul > src\components\ui\calendar.tsx
type nul > src\components\ui\card.tsx
type nul > src\components\ui\carousel.tsx
type nul > src\components\ui\chart.tsx
type nul > src\components\ui\checkbox.tsx
type nul > src\components\ui\collapsible.tsx
type nul > src\components\ui\command.tsx
type nul > src\components\ui\context-menu.tsx
type nul > src\components\ui\dialog.tsx
type nul > src\components\ui\drawer.tsx
type nul > src\components\ui\dropdown-menu.tsx
type nul > src\components\ui\form.tsx
type nul > src\components\ui\hover-card.tsx
type nul > src\components\ui\input-otp.tsx
type nul > src\components\ui\input.tsx
type nul > src\components\ui\label.tsx
type nul > src\components\ui\menubar.tsx
type nul > src\components\ui\navigation-menu.tsx
type nul > src\components\ui\pagination.tsx
type nul > src\components\ui\popover.tsx
type nul > src\components\ui\progress.tsx
type nul > src\components\ui\radio-group.tsx
type nul > src\components\ui\resizable.tsx
type nul > src\components\ui\scroll-area.tsx
type nul > src\components\ui\select.tsx
type nul > src\components\ui\separator.tsx
type nul > src\components\ui\sheet.tsx
type nul > src\components\ui\sidebar.tsx
type nul > src\components\ui\skeleton.tsx
type nul > src\components\ui\slider.tsx
type nul > src\components\ui\sonner.tsx
type nul > src\components\ui\switch.tsx
type nul > src\components\ui\table.tsx
type nul > src\components\ui\tabs.tsx
type nul > src\components\ui\textarea.tsx
type nul > src\components\ui\toast.tsx
type nul > src\components\ui\toaster.tsx
type nul > src\components\ui\toggle-group.tsx
type nul > src\components\ui\toggle.tsx
type nul > src\components\ui\tooltip.tsx
type nul > src\components\ui\use-toast.ts

REM OTHER COMPONENTS
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
