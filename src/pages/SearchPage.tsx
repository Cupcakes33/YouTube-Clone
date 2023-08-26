import React from "react";
import { useLocation } from "react-router-dom";

export default function SearchPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("search_query");

  return <div>{keyword}</div>;
}
