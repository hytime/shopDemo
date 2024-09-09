import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import locale from "antd/es/locale/en_US";
import router from "./router";
function App() {
  return (
    <>
      <ConfigProvider locale={locale}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  );
}

export default App;
