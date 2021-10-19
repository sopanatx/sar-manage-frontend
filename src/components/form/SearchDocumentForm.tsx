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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";

import GET_ALL_SEMESTERS_QUERY from "../../queries/AdminGetAllSemester";
import { useQuery, useMutation } from "@apollo/client";
import {
  ChevronDownIcon,
  DownloadIcon,
  LinkIcon,
  EditIcon,
  DeleteIcon,
  CloseIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { useState, useRef } from "react";
import SEARCH_FILE_BY_NAME from "../../mutation/searchFileByName";
import { Form } from "formik";

const SearchDocumentForm = () => {
  const [searchFile, { data }] = useMutation(SEARCH_FILE_BY_NAME);
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
      .then((result) => {
        console.log("[LOG] data: %s ", result.data);
      })
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
                <Button colorScheme="blue" mt={5} onClick={(e) => onSearch(e)}>
                  ค้นหา
                </Button>
              </FormControl>
              {data ? (
                <>
                  {" "}
                  <Table variant="striped" colorScheme="blue" overflow="auto">
                    <TableCaption>
                      *ท่านสามารถดาวน์โหลดเอกสารได้อย่างเดียวเท่านั้นจากระบบค้นหา*
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th>ปีการศึกษา</Th>
                        <Th>ชื่อเอกสาร</Th>
                        <Th>จัดการ</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.searchDocumentByName.map(
                        (item: any, index: any) => (
                          <>
                            <Tr>
                              <Td>{item.Semester.semesterName}</Td>
                              <Td>
                                {item.index} {item.title}
                              </Td>
                              <Td>
                                <Menu>
                                  <MenuButton
                                    as={Button}
                                    rightIcon={<ChevronDownIcon />}
                                  >
                                    ตัวเลือก
                                  </MenuButton>
                                  <MenuList>
                                    <MenuItem
                                      onClick={(e) =>
                                        window.open(item.fileUrl, "_blank")
                                      }
                                    >
                                      <DownloadIcon />
                                      <Text px={2}>ดาวน์โหลดไฟล์เอกสาร</Text>
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() =>
                                        navigator.clipboard.writeText(
                                          item.fileUrl
                                        )
                                      }
                                    >
                                      <LinkIcon />
                                      <Text px={2}> คัดลอกลิงก์</Text>
                                    </MenuItem>
                                  </MenuList>
                                </Menu>
                              </Td>
                            </Tr>
                          </>
                        )
                      )}
                    </Tbody>
                  </Table>
                </>
              ) : (
                <></>
              )}
            </form>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default SearchDocumentForm;
