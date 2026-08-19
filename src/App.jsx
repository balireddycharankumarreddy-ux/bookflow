import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import DashboardLayout from "./layouts/DashboardLayout";
import PageTransition from "./components/PageTransition";
import { ToastProvider } from "./components/Toast";
import { NotificationProvider } from "./components/NotificationContext";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";

// Book Pages
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";

// Student Pages
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import DeleteStudent from "./pages/DeleteStudent";

// Issue / Return
import IssueBook from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";

// Other Pages
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ToastProvider>
    <NotificationProvider>
    <BrowserRouter>

      <Routes>

        {/* Public Pages */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <PageTransition>
                <Home />
              </PageTransition>
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <PageTransition>
                <Login />
              </PageTransition>
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <PageTransition>
                <Register />
              </PageTransition>
            </>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <>
              <Navbar />
              <PageTransition>
                <ForgotPassword />
              </PageTransition>
            </>
          }
        />

        {/* Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/books" element={<Books />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/delete-book/:id" element={<DeleteBook />} />

          <Route path="/students" element={<Students />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />
          <Route path="/delete-student/:id" element={<DeleteStudent />} />

          <Route path="/issue-book" element={<IssueBook />} />
          <Route path="/return-book" element={<ReturnBook />} />

          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />

        </Route>

      </Routes>

    </BrowserRouter>
    </NotificationProvider>
    </ToastProvider>
  );
}

export default App;