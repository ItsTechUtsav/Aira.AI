import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    localStorage.removeItem("user");
    user = null;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;