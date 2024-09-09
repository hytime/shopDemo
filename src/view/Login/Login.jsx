import { Form, Input, Button, Row, Col } from "antd";
import { useUserState } from "@/store";
import "./Login.scss"; // 自定义样式文件
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const { login } = useUserState();
  const onFinish = async (values) => {
    console.log("Received values:", values);
    await login(values);
    // console.log("User", globalState);

    navigate("/");
  };

  return (
    <div className='login-container'>
      <Row justify='center' align='middle' style={{ height: "100vh" }}>
        <Col xs={24} sm={16} md={12} lg={8}>
          <div className='login-form-container'>
            <h2 className='login-title'>Login</h2>
            <Form
              name='basic'
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name='username'
                initialValue={"kminchelle"}
                rules={[
                  { required: true, message: "Please enter your username!" },
                ]}
              >
                <Input placeholder='username' />
              </Form.Item>

              <Form.Item
                name='password'
                initialValue={"0lelplR"}
                rules={[{ required: true, message: "Please enter password!" }]}
              >
                <Input.Password placeholder='password' />
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit' block>
                  login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
