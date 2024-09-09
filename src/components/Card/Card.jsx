import { Card, Spin, Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import CardModuleStyle from "./Card.module.scss";
import React, { useEffect } from "react";

CardComponents.prototype = {
  loading: false,
  children: React.Children,
  showPage: true,
  card: { ...Card.defaultProps },
  pagination: { ...Pagination.defaultProps },
};
CardComponents.defaultProps = {
  loading: true,
  showPage: true,
};
export default function CardComponents(mineCardProp) {
  useEffect(() => {
    //todlist
  });
  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: mineCardProp.loading ? "flex" : "none",
            position: "absolute",
            justifyContent: "center",
            alignContent: "center",
            left: "50%",
            top: "0",
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
        <div className={CardModuleStyle.plist}>
          <Card
            {...mineCardProp.card}
            style={{ display: !mineCardProp.loading ? "block" : "none" }}
          >
            {mineCardProp.children}
          </Card>
        </div>
        {mineCardProp.showPage ? (
          <Pagination
            {...mineCardProp.pagination}
            className={CardModuleStyle.pagination}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
