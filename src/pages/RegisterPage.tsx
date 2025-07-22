import React from "react";
import { Form, Input, Button, Col, Divider, Typography, message } from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

// Define the shape of form inputs
type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

// Yup validation schema
const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
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
});

const RegisterPage: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Inside your component
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    console.log("Registration data:", data);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
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
      message.success("Registration successful!");

      // Redirect to OTP route with email state
      navigate("/otp", {
        state: { email: result.email },
      });
    } catch (error) {
      console.error("Error:", error);
      message.error("Registration failed. Please try again.");
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
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        Create Account
      </Title>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <Form.Item
          label="Full Name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<UserOutlined />}
                placeholder="Your full name"
                size="large"
              />
            )}
          />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<MailOutlined />}
                placeholder="your.email@example.com"
                size="large"
              />
            )}
          />
        </Form.Item>

        {/* Password Field */}
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            style={{ background: "#ffa654", marginTop: "1rem" }}
          >
            Register
          </Button>
        </Form.Item>

        <Divider>Already have an account?</Divider>

        <div style={{ textAlign: "center" }}>
          <Text>Sign in to your account </Text>
          <a href="/login">Login here</a>
        </div>
      </Form>
    </Col>
  );
};

export default RegisterPage;
