import React from "react";
import { OverlayProvider } from "react-aria";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./services/queryClient";
import AppRouter from "./router/Router";

function App() {
  return (
    <OverlayProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </OverlayProvider>
  );
}

export default App;
