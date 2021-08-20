import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
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
  Alert,
  AlertIcon,
  useDisclosure,
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
  AddIcon,
} from "@chakra-ui/icons";
import { useState, useRef } from "react";
import GET_TOPIC_BY_SUBCATEGORIES from "../../queries/getTopicBySubCategories";
import ADMIN_ADD_TOPIC from "../../mutation/AdminAddTopic";

import { Form } from "formik";
import ADMIN_GET_TOPIC_BY_SUBCATEGORIES from "../../queries/AdminGetTopicBySubCategories";

const AddSubTopicForm = ({ TopicId }: any) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();
  const [topicInput, setTopicInput] = useState("");
  const { data, loading, error, refetch } = useQuery(
    ADMIN_GET_TOPIC_BY_SUBCATEGORIES,
    {
      variables: {
        getTopicBySubCategories: {
          subCategoryId: +TopicId,
        },
        getSubCategoryInfo: {
          id: +TopicId,
        },
      },
      fetchPolicy: "no-cache",
    }
  );
  const [AddTopic, {}] = useMutation(ADMIN_ADD_TOPIC);

  const onSubmit = (values: any) => {
    AddTopic({
      variables: {
        adminAddTopic: {
          topicName: topicInput,
          subCategoryId: +TopicId,
        },
      },
    })
      .then(() => {
        toast({
          title: `สำเร็จ`,
          status: "success",
          description: `เพิ่มหัวข้อสำเร็จแล้ว`,
          isClosable: true,
          position: "top-right",
          duration: 10000,
        });
        refetch();
        onClose();
        setTopicInput("");
      })
      .catch((err) => {
        toast({
          title: `ไม่สามารถเพิ่มหัวข้อนี้ได้`,
          status: "error",
          description: `${err.graphQLErrors[0].extensions.response.message}`,
          isClosable: true,
          position: "top-right",
          duration: 10000,
        });
      });
  };

  return (
    <>
      <Box bg="blue.100">
        <>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  เพิ่มข้อมูล
                </AlertDialogHeader>

                <AlertDialogBody>
                  <Text fontWeight="bold"> กรอกข้อมูลหัวข้อ</Text>
                  <FormControl>
                    <FormLabel htmlFor="name">ชื่อหัวข้อ :</FormLabel>
                    <Input
                      id="topicName"
                      name="topicName"
                      maxLength={50}
                      onChange={(e) => setTopicInput(e.target.value)}
                    />
                  </FormControl>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    ยกเลิก
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={(e) => onSubmit(e)}
                    ml={3}
                  >
                    เพิ่มหัวข้อ
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
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
            textAlign="center"
            boxShadow="md"
            bg="white"
          >
            <form>
              <Heading size="sm">จัดการหมวดหมู่ของตัวบ่งชี้ </Heading>

              {!loading && !error && data ? (
                <>
                  {data.getTopicBySubCategories.length > 0 ? (
                    <>
                      <Table variant="striped" colorScheme="blue">
                        <Thead>
                          <Tr>
                            <Th>ลำดับ</Th>
                            <Th>ชื่อ</Th>
                            <Th>ACTION</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <>
                            {data.getTopicBySubCategories.map(
                              (item: any, index: number) => (
                                <>
                                  <Tr>
                                    <Td>{index + 1}</Td>
                                    <Td>{item.topicName}</Td>
                                    <Td>
                                      {" "}
                                      <IconButton
                                        colorScheme="blue"
                                        aria-label="Edit"
                                        margin={3}
                                        icon={<EditIcon />}
                                        variant="solid"
                                        size="sm"
                                      />
                                      <IconButton
                                        colorScheme="red"
                                        aria-label="Edit"
                                        margin={3}
                                        icon={<DeleteIcon />}
                                        variant="solid"
                                        size="sm"
                                      />
                                    </Td>
                                  </Tr>
                                </>
                              )
                            )}
                          </>
                        </Tbody>
                      </Table>
                      <Button
                        leftIcon={<AddIcon />}
                        colorScheme="blue"
                        variant="outline"
                        onClick={onOpen}
                        mt={5}
                      >
                        สร้างหัวข้อใหม่
                      </Button>
                    </>
                  ) : (
                    <>
                      <Alert
                        status="info"
                        variant="subtle"
                        margin={2}
                        borderRadius={9}
                      >
                        <AlertIcon />
                        ตัวบ่งชี้นี้ ไม่มีหัวข้อย่อยใดๆ
                        ท่านสามารถเพิ่มหัวข้อย่อยจากปุ่มด้านล่าง
                      </Alert>
                      <Button
                        leftIcon={<AddIcon />}
                        colorScheme="blue"
                        variant="outline"
                        onClick={onOpen}
                      >
                        สร้างหัวข้อใหม่
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  {error ? (
                    <>
                      <CloseIcon
                        color="red.500"
                        align="center"
                        boxSize="7em"
                        py={5}
                      />
                      <Text>{error.message.replace("GraphQL error:", "")}</Text>
                    </>
                  ) : (
                    <>
                      <Stack alignItems="center">
                        {" "}
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="blue.500"
                          size="xl"
                        />{" "}
                      </Stack>
                    </>
                  )}
                </>
              )}
            </form>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AddSubTopicForm;
