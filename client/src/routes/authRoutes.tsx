import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface RouteProps {
  element: React.ComponentType;
}

// Private Route
export const PrivateRoute = ({
  element: Element,
}: RouteProps): ReactElement => {
  const location = useLocation();
  const token: string | null = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="login" state={{ from: location }} replace />;
  }

  return <Element />;
};

// Public Route
export const PublicRoute = ({ element: Element }: RouteProps): ReactElement => {
  const location = useLocation();
  const token: string | null = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  return <Element />;
};
