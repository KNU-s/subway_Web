import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      This is Layout.
      <Outlet />
    </div>
  );
};

export default Layout;
