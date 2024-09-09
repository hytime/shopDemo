import { Card, Tag, Image, Spin, Typography, Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardCompent from "@/components/Card/Card";
import { getProduct } from "@/api/product";
import "./Home.scss";
const gridStyle = {
  width: "25%",
  cursor: "pointer",
  // textAlign: "center",
};
export default function Home() {
  const location = useLocation();
  const naigate = useNavigate();
  const [current, setCurrent] = useState(1);
  const [list, setlist] = useState(location.state && location.state.list);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState(null);
  const onProductDetail = (id) => {
    naigate("/product", { state: id });
  };
  /**
   * page change handle
   * @param {*} page
   * @param {*} pageSize
   */
  const onPage = async (page, pageSize) => {
    setCurrent(page);
    const query = {
      skip: (page - 1) * pageSize,
      q: pageData && pageData.q ? pageData.q : "",
      limit: pageSize,
    };
    setLoading(() => true);
    const result = await getProduct(query);
    const list = await result.json();
    setlist(list);
    setLoading(() => false);
  };
  /**
   *  no navigate handler
   */
  useEffect(() => {
    (async () => {
      if (
        !(
          location.state &&
          location.state.list &&
          location.state.list.products &&
          location.state.list.products.length > 0
        )
      ) {
        // setPage()
        setLoading(() => true);
        const result = await getProduct({});
        const list = await result.json();
        setlist(list);
        setLoading(() => false);
      } else {
        setLoading(() => false);
        setlist(location.state && location.state.list);
        setPageData(location.state && location.state.query);
        setCurrent(
          location.state && location.state.list && location.state.list.skip + 1
        );
      }
      console.log(loading);
    })();
  }, [location.state, pageData]);
  return (
    <>
      <CardCompent
        loading={loading}
        pagination={{
          current: current,
          showSizeChanger: false,
          defaultPageSize: 20,
          className: "pagenation",
          // defaultCurrent={list && list.skip ? +list.skip + 1 : 1}
          total: list && list.total ? list.total : 1,
          pageSize: 20,
          onChange: (page, pageSize) => onPage(page, pageSize),
        }}
      >
        {list &&
          list.products &&
          list.products.map((item, index) => {
            return (
              <Card.Grid
                key={index}
                style={gridStyle}
                onClick={() => onProductDetail(item.id)}
              >
                <Image
                  preview={false}
                  src={item.thumbnail}
                  rootClassName='rootpimg'
                  className='productimg'
                  placeholder={<Spin></Spin>}
                />

                <div className='labels'>
                  <Tag className='tags'>
                    Up to {item.discountPercentage}% off
                  </Tag>
                  <Typography>
                    <Typography.Title level={5}>{item.title}</Typography.Title>
                    <Typography.Text>US${item.price}</Typography.Text>
                  </Typography>
                </div>
              </Card.Grid>
            );
          })}
      </CardCompent>
    </>
  );
}
