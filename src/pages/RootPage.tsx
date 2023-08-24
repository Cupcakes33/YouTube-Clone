
import { Outlet } from "react-router-dom";
import Layout from "../components/Layout";

export default function RootPage() {
  return (
    <Layout>
      <div>123</div>
      <Outlet />
    </Layout>
  );
}
