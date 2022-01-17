import { Box } from "@chakra-ui/react";

const Card: React.FC = ({ children }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" px="4" py="3" h="full" w="full">
      {children}
    </Box>
  );
};

export default Card;
