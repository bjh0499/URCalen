import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <header>Header</header>
      <Outlet></Outlet>
      <footer>Footer</footer>
    </>
  );
}
