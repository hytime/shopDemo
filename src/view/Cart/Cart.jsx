import { useEffect, useState } from "react";
import { Table, Image, Button, Modal, Form, Spin, InputNumber } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getUserCart } from "@/api/cart";
import "./Cart.scss";

const { confirm } = Modal;
/**
 *  cart
 * @returns
 */
const CartPage = () => {
  const [form] = Form.useForm();
  const [carts, setCarts] = useState(null);
  const [visible, setVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  /**
   * click show cart Quantity to purchase
   * @param {*} product
   */
  const handleEdit = (product) => {
    console.log(product);
    const pData = { ...product };
    setEditingProduct(() => pData);
    form.setFieldsValue(product);
    setVisible(true);
  };

  const handleDelete = (productId) => {
    confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this product?",
      onOk: async () => {
        setCarts((data) => {
          data.carts[0].products.map((item, index) => {
            if (item.id === productId) {
              data.carts[0].products.splice(index, 1);
            }
          });
          const newData = { ...data };
          return newData;
        });
        // Delete logic here
      },
    });
  };

  const handleCancel = () => {
    setVisible(false);
    setEditingProduct(() => null);
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
    setCarts((data) => {
      data.carts[0].products.map((item) => {
        if (item.id === editingProduct.id) {
          item.quantity = values.quantity;
        }
      });
      const newData = { ...data };
      return newData;
    });
    setVisible(false);
    setEditingProduct(() => null);
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (text, record) => (
        <div className='product-info'>
          <Image src={record.thumbnail} alt={record.title} width={50} />
          <span className='product-title'>{record.title}</span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>${text}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text) => <span>${text}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button type='primary' onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type='danger'
            onClick={() => handleDelete(record.id)}
            style={{ marginLeft: 10 }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const fetchfn = async () => {
    const user = localStorage.getItem("user");
    const userObj = {};
    if (user) {
      Object.assign(userObj, JSON.parse(user));
    }

    setLoading(true);

    const res = await getUserCart(userObj?.id);
    const data = await res.json();
    console.log("carts data", data);
    const obj = { ...data };
    setCarts(() => obj);
    console.log("carts", carts);
    setLoading(false);
  };
  useEffect(() => {
    if (!carts || carts.length < 0) {
      fetchfn();
    }
    console.log("carts effect", carts);
    console.log("product effect", editingProduct);
  }, [carts]);
  return (
    <div className='cart-page-container'>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      ) : (
        <>
          <Table
            width='100%'
            columns={columns}
            dataSource={
              carts &&
              carts.carts &&
              carts.carts[0].products.map((product, index) => ({
                ...product,
                key: index,
              }))
            }
            pagination={false}
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Total:</Table.Summary.Cell>
                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  {carts &&
                    carts.carts &&
                    carts.carts[0] &&
                    carts.carts[0].totalQuantity}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  $
                  {carts &&
                    carts.carts &&
                    carts.carts[0] &&
                    carts.carts[0].discountedTotal}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}></Table.Summary.Cell>
              </Table.Summary.Row>
            )}
          />

          <Modal
            title='Edit Product'
            open={visible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              form={form}
              name='editProduct'
              initialValues={editingProduct}
              onFinish={onFinish}
            >
              <Form.Item
                label='Quantity'
                name='quantity'
                rules={[
                  { required: true, message: "Please input the quantity!" },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Save
                </Button>
                <Button onClick={handleCancel} style={{ marginLeft: 10 }}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default CartPage;
