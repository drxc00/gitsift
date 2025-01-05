"use client";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
// Since we are using Next.js, we need to use the QueryClientProvider to wrap our app
export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}