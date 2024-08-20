import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { usePrefetchLine } from "./hooks/useLine";
import routesConfig from "./routesConfig";

const router = createBrowserRouter(routesConfig);

function App() {
  usePrefetchLine(); // 전역적으로 사용할 지하철 노선 데이터 미리 fetch 하기
  return <RouterProvider router={router} />;
}

export default App;
