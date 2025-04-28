import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";

export default function RootLayout() {
  return (
    <div className="flex-col h-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
