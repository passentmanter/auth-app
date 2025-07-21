import { Outlet } from "react-router-dom";
import React from "react";
import { Card, Row, Col } from "antd";
import loginImage from "../assets/login-image.jpg";

const GuestLayout = () => (
  <div
    style={{
      height: "100vh",
      backgroundColor: "#58c4f2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Card
      style={{
        width: "100%",
        maxWidth: "1000px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
      bodyStyle={{ padding: 0 }}
    >
      <Row gutter={0}>
        {/* Left Section - Image */}
        <Col
          xs={0}
          sm={0}
          md={12}
          lg={12}
          xl={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f2f5",
            padding: "40px",
          }}
        >
          <img
            src={loginImage}
            alt="Login Illustration"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Col>
        {/* Right Section - Form */}
        <Outlet />
      </Row>
    </Card>
  </div>
);

export default GuestLayout;
