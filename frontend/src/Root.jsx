import { Outlet } from "react-router-dom";
// import MainNavigation from "./components/MainNavigation";
import Footer from "./Components/UI/Footer";

function Root() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
export default Root;