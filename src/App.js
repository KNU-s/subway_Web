import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import SubwayLineDetailPage from "./SubwayLineDetailPage";
import SubwayLinePage from "./SubwayLinePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/line",
      element: <SubwayLinePage />,
    },
    {
      path: "/line/:lineNumber",
      element: <SubwayLineDetailPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
