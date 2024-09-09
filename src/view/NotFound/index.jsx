import { Empty } from "antd";
import { useLocation } from "react-router-dom";
import notfoundStyle from "./notfound.module.scss";
function NotFound() {
  const location = useLocation();

  return (
    <div className={notfoundStyle.notfound}>
      <Empty
        description={
          <>
            <div> not found path:</div>
            <div>{location.pathname}</div>
          </>
        }
      />
    </div>
  );
}

export default NotFound;
