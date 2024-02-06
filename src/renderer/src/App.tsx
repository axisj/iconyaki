import PageRoute from "./router/PageRoute";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Suspense } from "react";
import "./global.css";

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<></>}>
        <PageRoute />
      </Suspense>
    </HashRouter>
  );
}

export default App;
