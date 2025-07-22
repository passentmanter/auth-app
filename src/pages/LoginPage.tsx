import React from "react";
import { Form, Input, Button, Checkbox, Col, Divider, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import loginImage from "../assets/login-image.jpg"; // Image retained

const { Title, Text } = Typography;

// Types
type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

// Validation Schema
const loginSchema = yup.object({
  email: yup
    .string()
    .email("please enter valid email")
    .required("Please input your Email!"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
  remember: yup.boolean().required(),
});

const LoginPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    console.log("Received values of form:", data);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      // Handle successful login (e.g., redirect, store token, etc.)
    } catch (error) {
      console.error("Error:", error);
      // Handle errors (e.g., show error message to user)
    }
  };

  return (
    <Col
      xs={24}
      sm={24}
      md={12}
      lg={12}
      xl={12}
      style={{
        maxHeight: "100vh",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        Welcome Back
      </Title>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {/* Email */}
        <Form.Item
          label="Username"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<UserOutlined />}
                placeholder="Email"
                size="large"
              />
            )}
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            )}
          />
        </Form.Item>

        {/* Remember Me */}
        <Form.Item>
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value}>
                Remember me
              </Checkbox>
            )}
          />

          <a href="#forgot-password" style={{ float: "right" }}>
            Forgot password?
          </a>
        </Form.Item>

        {/* Submit */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            style={{ background: "#ffa654", marginTop: "1rem" }}
          >
            Log in
          </Button>
        </Form.Item>

        <Divider>Or</Divider>

        <div style={{ textAlign: "center" }}>
          <Text>Don't have an account? </Text>
          <a href="/register">Register now!</a>
        </div>
      </Form>
    </Col>
  );
};

export default LoginPage;
