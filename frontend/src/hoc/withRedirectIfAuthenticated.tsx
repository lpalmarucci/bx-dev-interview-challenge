import {AppRoutes} from "../routes/types.ts";
import {useAuthContext} from "../contexts/auth.context.tsx";
import {useNavigate} from "react-router";
import {type ComponentType, useEffect} from "react";

export const withRedirectIfAuthenticated = (WrappedComponent: ComponentType, route: AppRoutes) => {
  const ComponentWithRedirect = () => {
    const {isAuthenticated} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuthenticated) {
        navigate(route, {replace: true});
      }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) return;

    return <WrappedComponent/>;
  }

  return ComponentWithRedirect;
}
