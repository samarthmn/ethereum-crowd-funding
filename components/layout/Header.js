import React from "react";
import {
  Heading,
  Button,
  Flex,
  Link,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      px={{ base: 5, lg: 10 }}
      py={2}
    >
      <Flex
        as={Link}
        alignItems="center"
        href="/"
        _hover={{ textDecoration: "none" }}
      >
        <Image src="/logo.png" height="14" />
        <Heading mx={2} as="h1">
          Fund Labs
        </Heading>
      </Flex>
      <Button
        onClick={toggleColorMode}
        variant="ghost"
        _focus={{ outline: "" }}
        mr={-2}
      >
        {colorMode === "light" ? <FaMoon /> : <FaSun />}
      </Button>
    </Flex>
  );
}

export default Header;
