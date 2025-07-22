import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Col,
  Typography,
  Alert,
  Space,
  message,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const OTPVerificationPage = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const { email } = location.state || {};
  console.log("email", email);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle OTP submission
  const handleSubmit = async () => {
    if (!email) {
      setVerificationError("Email not found. Please register again.");
      return;
    }

    if (otp.length !== 6) {
      setVerificationError("Please enter a 6-digit OTP code.");
      return;
    }

    setIsLoading(true);
    setVerificationError("");

    try {
      // Make API call to verify OTP
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "OTP verification failed");
      }

      console.log("OTP verified successfully", result);
      message.success("Verification successful!");

      // Redirect to dashboard or home page after successful verification
      navigate("/dashboard");
    } catch (error) {
      console.error("OTP verification error:", error);
      setVerificationError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  // Handle resend OTP
  const handleResendOTP = () => {
    setTimeLeft(60); // Reset to 5 minutes
    setIsResendDisabled(true);
    setOtp("");
    setVerificationError("");

    // Simulate API call to resend OTP
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      message.success("New OTP sent successfully!");
    }, 1000);
  };

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft === 0) {
      setIsResendDisabled(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

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
        OTP Verification
      </Title>

      <Text
        type="secondary"
        style={{ textAlign: "center", marginBottom: "24px" }}
      >
        We've sent a 5-digit verification code to your email
      </Text>

      {verificationError && (
        <Alert
          message={verificationError}
          type="error"
          showIcon
          style={{ marginBottom: "24px" }}
        />
      )}

      <Form layout="vertical" style={{ margin: "auto" }}>
        <Form.Item
          label="Enter Verification Code"
          validateStatus={verificationError ? "error" : ""}
        >
          <Input.OTP
            length={5}
            size="large"
            onChange={(value) => setOtp(value)}
            value={otp}
            // type="number"
            // style={{  }}
            style={{
              gap: "8px",
            }}
          />
        </Form.Item>

        <Space
          style={{
            marginBottom: "24px",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text type={isResendDisabled ? "secondary" : "danger"}>
            {isResendDisabled
              ? `Resend OTP in ${formatTime(timeLeft)}`
              : "OTP expired"}
          </Text>
          <Button
            type="link"
            icon={<ReloadOutlined />}
            onClick={handleResendOTP}
            disabled={isResendDisabled}
            loading={isLoading}
          >
            Resend OTP
          </Button>
        </Space>

        <Form.Item>
          <Button
            style={{ width: "100%" }}
            type="primary"
            onClick={handleSubmit}
            block
            size="large"
            loading={isLoading}
            disabled={otp.length !== 6}
          >
            Verify
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

export default OTPVerificationPage;
