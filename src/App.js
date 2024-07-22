import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage";
import Layout from "./Layout";
import SubwayLineDetailPage from "./SubwayLineDetailPage";
import SubwayLinePage from "./SubwayLinePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
