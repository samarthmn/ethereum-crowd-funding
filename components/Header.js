import React, { useEffect, useState } from "react";
import {
  Heading,
  Button,
  Flex,
  Link,
  useColorMode,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
} from "@chakra-ui/react";
import { FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import { useWeb3React } from "@web3-react/core";
import { walletInjected } from "../ethereum/web3/connectors";
import { compressedAddress } from "../utils/string-utils";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { active, account, activate, deactivate, library, connector } =
    useWeb3React();
  const [loading, setLoading] = useState(false);

  const connect = async () => {
    try {
      setLoading(true);
      await activate(walletInjected);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const disconnect = () => {
    try {
      deactivate(walletInjected);
    } catch (error) {
      console.error(error);
    }
  };

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
      <Flex alignItems="center">
        {loading ? (
          <Spinner />
        ) : active ? (
          <>
            <Menu variant="outline" _focus={{ outline: "" }} ml={2}>
              <MenuButton as={Button} variant="ghost" _focus={{ outline: "" }}>
                <FaUserCircle />
              </MenuButton>
              <MenuList>
                <MenuItem>Address - {compressedAddress(account)}</MenuItem>
                <MenuItem onClick={disconnect}>Disconnect</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Button
            onClick={connect}
            variant="outline"
            _focus={{ outline: "" }}
            ml={2}
          >
            Connect
          </Button>
        )}
        <Button
          onClick={toggleColorMode}
          variant="ghost"
          _focus={{ outline: "" }}
          mr={-2}
        >
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
      </Flex>
    </Flex>
  );
}

export default Header;
