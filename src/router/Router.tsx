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

// Define the root route with Outlet for nested routes
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Define the login route as the initial route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Login,
});

// Define the InviteManagement route
const inviteManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/invites",
  component: InviteManagement,
});

// Create the route tree with the defined routes
const routeTree = rootRoute.addChildren([loginRoute, inviteManagementRoute]);

// Create the router with the route tree
const router = createRouter({ routeTree });

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
