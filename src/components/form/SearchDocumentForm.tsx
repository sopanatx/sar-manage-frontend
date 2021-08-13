import {
  Box,
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  Spinner,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import GET_ALL_SEMESTERS_QUERY from "../../queries/AdminGetAllSemester";
import { useQuery, useMutation } from "@apollo/client";
import { CloseIcon, RepeatIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";
import SEARCH_FILE_BY_NAME from "../../mutation/searchFileByName";
import { Form } from "formik";

const SearchDocumentForm = () => {
  const [searchFile, {}] = useMutation(SEARCH_FILE_BY_NAME);
  const [searchInput, setSearchInput] = useState("");
  const onSearch = (event: any) => {
    event.preventDefault();
    searchFile({
      variables: {
        searchDocumentByName: {
          name: searchInput,
        },
      },
    })
      .then((result) => {})
      .catch((error) => {
        console.log("[LOG] Not found file to search");
      });
  };

  return (
    <>
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
            maxWidth="600px"
            borderRadius={4}
            // textAlign="center"
            boxShadow="md"
            bg="white"
          >
            <form>
              <FormControl>
                <FormLabel>พิมพ์ชื่อเอกสารที่ต้องการค้นหา</FormLabel>
                <Input
                  id="searchInput"
                  type="search"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <Button colorScheme="blue" px={5} onClick={(e) => onSearch(e)}>
                  ค้นหา
                </Button>
              </FormControl>

              <Table variant="striped" colorScheme="teal">
                <TableCaption>
                  Imperial to metric conversion factors
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </form>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default SearchDocumentForm;
