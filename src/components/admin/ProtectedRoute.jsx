import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user, loading, isAdmin } = useAuth();

  // 1️⃣ Wait for auth state to load
  if (loading) return null;

  // 2️⃣ Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/safranbro-admin/login" replace />;
  }

  // 3️⃣ Logged in but not admin → redirect to public homepage
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // 4️⃣ User is logged in (and admin if required) → render children
  return children;
};

export default ProtectedRoute;