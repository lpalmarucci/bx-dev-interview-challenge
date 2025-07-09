import {useAuthContext} from "../contexts/auth.context.tsx";
import {PropsWithChildren, useEffect} from "react";
import {useNavigate} from "react-router";
import {AppRoutes} from "../routes/types.ts";

const ProtectedRoute = ({children}: PropsWithChildren) => {
  const {isAuthenticated} = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(AppRoutes.Login, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return;

  return children;
}

export default ProtectedRoute;
