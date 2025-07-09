import {createBrowserRouter, RouteObject} from "react-router";
import {AppRoutes} from "./types.ts";
import LoginPage from "../pages/Login.tsx";
import Homepage from "../pages/Homepage.tsx";

const ROUTES: RouteObject[] = [
  {
    path: AppRoutes.Login,
    Component: LoginPage
  },
  {
    path: AppRoutes.Homepage,
    Component: Homepage
  }
]

export const browserRouter = createBrowserRouter(ROUTES)
