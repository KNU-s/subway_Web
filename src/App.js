import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useLine } from "./hooks/useLine";
import Layout from "./Layout";
import { LineDetail, Lines, Main } from "./pages";

function App() {
  const line = useLine(); // line 정보는 모든 컴포넌트에서 사용하므로 App에서 선언한다.
  console.log("Prefetched line", line);

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
