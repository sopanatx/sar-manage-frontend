import {
  Box,
  Flex,
  Text,
  Table,
  TableCaption,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Tfoot,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useQuery } from "react-apollo";
import { WarningIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/react-hooks";
const VARIANT_COLOR = "blue";
const ListCategories = ({ semester }: any) => {
  return (
    <Box bg="blue.100">
      <Flex
        minHeight="100vh"
        width="full"
        align="center"
        justifyContent="center"
      >
        <Box
          px={5}
          py={10}
          width="full"
          maxWidth="700px"
          maxHeight="800px"
          borderRadius={4}
          textAlign="center"
          // boxShadow="lg"
          bg="white"
        >
          <Box></Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ListCategories;
