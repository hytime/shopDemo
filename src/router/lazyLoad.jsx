import { Spin } from "antd";
import { Suspense } from "react";
const loadingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  minHeight: "inherit",
};
const lazyLoad = (Component) => {
  return (
    <Suspense
      fallback={
        <div style={loadingStyle}>
          <Spin size='large'></Spin>
        </div>
      }
    >
      <Component />
    </Suspense>
  );
};

export default lazyLoad;
