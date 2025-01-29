import { Outlet } from "react-router-dom";
import Footer from "./components/UI/Footer";

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