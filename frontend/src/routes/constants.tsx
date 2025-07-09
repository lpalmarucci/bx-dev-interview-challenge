import {createBrowserRouter, RouteObject} from "react-router";
import {AppRoutes} from "./types.ts";
import LoginPage from "../pages/Login.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import {lazy, Suspense} from "react";
import PageLoader from "../components/PageLoader.tsx";

const Homepage = lazy(() => import("../pages/Homepage.tsx"));

const ROUTES: RouteObject[] = [
  {
    path: AppRoutes.Login,
    element: <LoginPage />,
  },
  {
    path: AppRoutes.Homepage,
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <Homepage />
        </Suspense>
      </ProtectedRoute>
    )
  }
]

export const browserRouter = createBrowserRouter(ROUTES)
