import { useEffect, useState } from "react";
import { Card, Row, Col, Image, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CardCompent from "@/components/Card/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductDetail } from "@/api/product";
import "./Product.scss";
const { Meta } = Card;

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const onShopCart = () => {
    navigate("/cart", {});
  };
  useEffect(() => {
    console.log("Product", location);
    (async () => {
      if (location.state) {
        setLoading(true);
        const result = await getProductDetail(location.state);
        const json = await result.json();
        setProduct(json);
        setLoading(false);
      }
    })();
  }, []);
  return (
    <CardCompent loading={loading} showPage={false}>
      <Row gutter={8} align={"stretch"}>
        <Col span={16}>
          <Card
            bordered={true}
            hoverable={true}
            cover={<Image alt={product.title} src={product.thumbnail} />}
            className='product-card'
          >
            <Meta title={product.title} description={product.description} />
          </Card>
        </Col>
        <Col span={8}>
          <div className='product-content'>
            <div className='product-info'>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <p>
                <strong>Discount:</strong> {product.discountPercentage}%
              </p>
              <p>
                <strong>Rating:</strong> {product.rating}
              </p>
              <p>
                <strong>Stock:</strong> {product.stock}
              </p>
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
            </div>
            <div className='product-option'>
              <Button shape='round' onClick={onShopCart}>
                <ShoppingCartOutlined /> Add To Cart
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row justify='center'>
        <Col>
          <div className='product-images'>
            {product &&
              product.images &&
              product.images.map((image, index) => (
                <Image
                  width={"100%"}
                  key={index}
                  alt={`Image ${index}`}
                  src={image}
                  className='product-image'
                />
              ))}
          </div>
        </Col>
      </Row>
    </CardCompent>
  );
};

export default ProductDetails;
