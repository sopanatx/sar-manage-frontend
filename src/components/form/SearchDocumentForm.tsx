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
  const [searchSemester, {}] = useMutation(SEARCH_FILE_BY_NAME);
  const [searchInput, setSearchInput] = useState("");
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
              </FormControl>
              <Button colorScheme="blue" px={5}>
                ค้นหา
              </Button>
            </form>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default SearchDocumentForm;
