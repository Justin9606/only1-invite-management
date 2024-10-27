import React from "react";
import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import Login from "../pages/Login";
import InviteManagement from "../pages/InviteManagement";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Login,
});

const inviteManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/invites",
  component: InviteManagement,
});

const routeTree = rootRoute.addChildren([loginRoute, inviteManagementRoute]);

const router = createRouter({ routeTree });

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
