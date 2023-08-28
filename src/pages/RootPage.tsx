import { Outlet } from "react-router-dom";
import Layout from "../components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootPage() {
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </Layout>
  );
}
