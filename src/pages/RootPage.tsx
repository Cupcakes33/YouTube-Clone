import React from "react";
import { Outlet } from "react-router-dom";

export default function RootPage() {
  return (
    <>
      <div>RootPage</div>
      <Outlet />
    </>
  );
}
