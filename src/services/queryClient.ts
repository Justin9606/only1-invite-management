import { QueryClient } from "@tanstack/react-query";

// Create and configure the Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Avoid unnecessary refetching on window focus
      staleTime: 1000 * 60 * 5, // 5 minutes of stale time
    },
  },
});

export default queryClient;
