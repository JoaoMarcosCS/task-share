import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SideBar } from "./SideBar";

export function LayoutPrivate() {
  return (
    <main className="w-full h-screen bg-gray-50">
      <Header />
      <SideBar />
      <div className="ms-0 sm:ms-40 sm:mt-32 pt-20 sm:pt-0 pb-28 flex ">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
