import React, { useState } from "react";
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
import useWeb3 from "../hooks/useWeb3";

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { active, account } = useWeb3React();
  const { connect, disconnect } = useWeb3();
  const [loading, setLoading] = useState(false);

  const connectAccount = async () => {
    try {
      setLoading(true);
      await connect(walletInjected);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const disconnectAccount = () => {
    try {
      deactivate();
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
                <MenuItem onClick={disconnectAccount}>Disconnect</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Button
            onClick={connectAccount}
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
};

export default Header;
