import { createBrowserRouter } from "react-router-dom";
import ManagerLayout from "../components/ManagerLayout";
import Home from "../pages/Home";
import Dashboard from "../pages/manager/dashboard";
import Product from "../pages/manager/Product";
import Order from "../pages/manager/Order";
import Staff from "../pages/manager/Staff";
import Menu from "../pages/Menu";
import Detail from "../pages/Detail";
import MainLayout from "../components/mainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Payment from "../pages/Payment";
import About from "../pages/About";
import Contact from "../pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "details/:id",
        element: <Detail />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "payments",
        element: <Payment />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/manager",
    element: <ManagerLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "orders",
        element: <Order />,
      },
      {
        path: "staffs",
        element: <Staff />,
      },
    ],
  },
]);

export default router;
