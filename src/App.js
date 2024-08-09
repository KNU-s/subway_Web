import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { usePrefetchLine } from "./hooks/useLine";
import { LineDetail, Lines, Main } from "./pages";

function App() {
  usePrefetchLine(); // 전역적으로 사용할 지하철 노선 데이터 미리 fetch 하기

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
          path: "/line/:lineId",
          element: <LineDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
