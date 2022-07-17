import { Outlet } from "react-router-dom";
import Navigation from "../landingPageComponents/Navigation/navigation";

const SharedNav = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default SharedNav;
