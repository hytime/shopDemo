import { Avatar, Badge, Card, Image } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import mainStyle from "./index.module.scss";
import Search from "antd/es/input/Search";
import { getProduct } from "@/api/product";
import { useUserState } from "../store";
import logo from "@/assets/img/logo.png";
/**
 * main View
 * @returns main vie Frameworks
 */
export default function Main() {
  const navigate = useNavigate();
  const { isLogined, user, setUser, logout } = useUserState();

  const [cartNumber, setCartNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  /**
   * search phone
   */
  const onSearch = useCallback(
    async (value, _e, info) => {
      setLoading(true);
      const query = { q: value };
      const result = await getProduct(query);
      const json = await result.json();
      navigate("/home", { state: { list: json, query } });
      setLoading(false);
    },
    [searchText]
  );
  const onUserState = () => {
    if (!isLogined) {
      navigate("/login", {});
    }
  };
  const onLogo = () => {
    navigate("/", {});
  };
  const goCartPage = useCallback(() => {
    navigate("/cart", {});
  }, []);
  const onLogout = () => {
    logout();
    navigate("/");
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userObj = JSON.parse(user);
      setUser(userObj);
    }
    console.log("user", user);
  }, []);
  return (
    <div className={"container"}>
      <div className={mainStyle.stautsbar}>
        <div className={mainStyle.content}>
          <div className={mainStyle.logo} onClick={onLogo}>
            <Image src={logo} preview={false} />
          </div>
          <div className={mainStyle.search}>
            <Search
              placeholder='Search Products'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              loading={loading}
              onSearch={(value, _e, info) => onSearch(value, _e, info)}
            />
          </div>
          <div className={mainStyle.shopsuerinfo}>
            <>
              <div
                className={`${mainStyle.item} ${mainStyle.userstate}`}
                onClick={onUserState}
              >
                <Avatar
                  icon={<UserOutlined />}
                  src={isLogined && user.image}
                ></Avatar>
              </div>
              {isLogined && (
                <>
                  <div className={mainStyle.item}>
                    <Badge count={cartNumber} size='small'>
                      <ShoppingCartOutlined
                        onClick={() => goCartPage()}
                        className={mainStyle.cart}
                        size={"large"}
                      />
                    </Badge>
                  </div>
                  <div className={mainStyle.item}>
                    <LogoutOutlined
                      onClick={() => onLogout()}
                      className={mainStyle.cart}
                      size={"midle"}
                    />
                  </div>
                </>
              )}
            </>
          </div>
        </div>
      </div>
      <Card className={mainStyle.maincontent}>
        <Outlet></Outlet>
      </Card>
    </div>
  );
}
