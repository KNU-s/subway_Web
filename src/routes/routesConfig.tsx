import { Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { LineDetail, Lines } from "../pages";

const routesConfig = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Lines />,
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
