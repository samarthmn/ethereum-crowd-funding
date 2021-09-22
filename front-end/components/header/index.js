import React from "react";
import styles from "./../../styles/header.module.css";
import { Layout, Typography } from "antd";

const { Text } = Typography;

function Header() {
  return (
    <Layout.Header className={styles.container}>
      <Text className={styles.title}>Fund Labs</Text>
    </Layout.Header>
  );
}

export default Header;
