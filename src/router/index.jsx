import { createBrowserRouter, Navigate } from "react-router-dom";
import lazyLoad from "./lazyLoad";
import { lazy } from "react";

const Home = lazyLoad(lazy(() => import("@/view/Home/Home")));
const Main = lazyLoad(lazy(() => import("@/view/")));
const NotFoundPage = lazyLoad(lazy(() => import("@/view/NotFound")));
const Cart = lazyLoad(lazy(() => import("@/view/Cart/Cart")));
const Product = lazyLoad(lazy(() => import("@/view/Product/Product")));
const Login = lazyLoad(lazy(() => import("@/view/Login/Login")));
export const routes = [
  {
    path: "/",
    element: Main,
    children: [
      {
        index: true,
        element: <Navigate to='/home' replace />,
        handle: {
          isShow: false,
        },
      },
      {
        path: "home",
        element: Home,
      },
      {
        path: "cart",
        element: Cart,
      },
      {
        path: "product",
        element: Product,
      },
      {
        path: "login",
        element: Login,
      },
      {
        path: "*",
        element: NotFoundPage,
        handle: {
          isShow: false,
        },
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: "/",
});
export default router;
