import { Navigate } from "react-router-dom";
import { useRole } from "../contexts/RoleContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useRole();

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}