import { Box } from "@chakra-ui/react";

function Card({ children }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" px="4" py="3" h="full" w="full">
      {children}
    </Box>
  );
}

export default Card;
