import PageRoute from "./router/PageRoute";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import "./global.css";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <PageRoute />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
