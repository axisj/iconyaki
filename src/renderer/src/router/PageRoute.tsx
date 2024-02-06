import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../pages/Layout";

const Error404 = React.lazy(() => import("../pages/error/Error404"));
// const Browser = React.lazy(() => import("../pages/browser/App"));
const Browser = React.lazy(() => import("../pages/browser/App"));
const Upload = React.lazy(() => import("../pages/upload/App"));
const Guide = React.lazy(() => import("../pages/guide/App"));

function PageRoute() {
  React.useEffect(() => {}, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={"/"} element={<Browser />} />
        <Route path={"/upload"} element={<Upload />} />
        <Route path={"/guide"} element={<Guide />} />
        <Route path={"*"} element={<Browser />} />
      </Route>
    </Routes>
  );
}

export default PageRoute;
