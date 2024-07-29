import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import { LineDetail, Lines, Main } from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: "/line",
          element: <Lines />,
        },
        {
          path: "/line/:lineNumber",
          element: <LineDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
