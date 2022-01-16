import React, { useEffect } from "react";
import { Container } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import useWeb3 from "../hooks/useWeb3";

function Layout({ children }) {
  const { init } = useWeb3();
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <Header />
      <Container mt={5} maxW="container.md">
        {children}
      </Container>
      <Footer />
    </div>
  );
}

export default Layout;
