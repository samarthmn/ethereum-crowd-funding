import React from "react";
import Header from "../Header";
import { Layout as AntLayout } from "antd";
import Footer from "../footer";

const { Content } = AntLayout;

function Layout({ children }) {
  return (
    <div>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
}

export default Layout;
