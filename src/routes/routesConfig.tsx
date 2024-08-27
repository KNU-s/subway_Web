import { Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home, LineDetail } from "../pages";

const routesConfig = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/line/:lineId",
        element: <LineDetail />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
];

export default routesConfig;
