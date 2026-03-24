import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { RoleProvider, useRole } from "./contexts/RoleContext";
import ProtectedRoute from "./components/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentProfile from "./pages/StudentProfile";
import Companies from "./pages/Companies";
import Internships from "./pages/Internships";
import Placements from "./pages/Placements";
import Reports from "./pages/Reports";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Applications from "./pages/Applications";
// import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user } = useRole();

  // 🔐 Not logged in
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // ✅ Logged in
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/internships" element={<Internships />} />

        {/* Admin Only */}
        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route path="/students/:id" element={<StudentProfile />} />

        <Route
          path="/placements"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Placements />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Student */}
        <Route path="/applications" element={<Applications />} />

        {/* Prevent access */}
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/signup" element={<Navigate to="/" replace />} />

        {/* 404 */}
        
      </Routes>
    </MainLayout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RoleProvider>
          <AppRoutes />
        </RoleProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}