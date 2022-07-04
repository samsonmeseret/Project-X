import { Outlet } from "react-router-dom";
import Navigation from "../Nave/navigation";

const SharedNav = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default SharedNav;
