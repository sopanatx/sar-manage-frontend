import {
  Heading,
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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useDisclosure,
  SimpleGrid,
  Link,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  InputGroup,
  InputRightAddon,
  InputLeftAddon,
  Select,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@apollo/client";
import { CloseIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";
import ADMIN_GET_ALL_CATEGORY from "../../queries/AdminGetAllCategory";
import ADMIN_ADD_SUB_CATEGORY_MUTATION from "../../mutation/AdminAddSubCategory";
import ADMIN_DELETE_SUB_CATEGORY_MUTATION from "../../mutation/AdminDeleteSubCategory";
interface isOpenType {
  dialog: boolean;
  id: string;
  name: string;
}

interface deleteSubCategoryType {
  id: number;
  name: string;
  isShow: boolean;
}
const AddTopicForm = () => {
  const toast = useToast();
  const { loading, error, data, refetch } = useQuery(ADMIN_GET_ALL_CATEGORY, {
    fetchPolicy: "no-cache",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<any>();
  const [category, setCategory] = useState<String>("");
  const [subCategory, setSubCategory] = useState<String>("");
  const [addSubCategory, {}] = useMutation(ADMIN_ADD_SUB_CATEGORY_MUTATION);
  const [deleteSubCategory, {}] = useMutation(
    ADMIN_DELETE_SUB_CATEGORY_MUTATION
  );
  const [subCategoryDelete, setSubCategoryDelete] =
    useState<deleteSubCategoryType>({
      name: "",
      id: 0,
      isShow: false,
    });
  const onCloseAlert = () =>
    setSubCategoryDelete({ isShow: false, id: 0, name: "" });
  const cancelRef = useRef<any>();
  const onSubmit = (e: any) => {
    e.preventDefault();
    addSubCategory({
      variables: {
        input: {
          categoryId: +category,
          subCategoryName: subCategory,
        },
      },
    })
      .then(() => {
        toast({
          title: `สำเร็จ`,
          status: "success",
          description: `เพิ่มองค์ประกอบ ${subCategory} สำเร็จ`,
          isClosable: true,
          position: "top-right",
          duration: 10000,
        });
        refetch();
        setCategory("");
        setSubCategory("");
      })
      .catch((err) => {
        toast({
          title: `ไม่สามารถเพิ่มตัวบ่งชี้นี้ได้`,
          status: "error",
          description: `${err.message.replace("GraphQL error:", "")}`,
          isClosable: true,
          position: "top-right",
          duration: 10000,
        });
      });
  };

  const onDelete = (e: any) => {
    e.preventDefault();
    deleteSubCategory({
      variables: {
        input: {
          subCategoryId: +subCategoryDelete.id,
        },
      },
    })
      .then(() => {
        toast({
          title: `ดำเนินการสำเร็จ`,
          status: "success",
          description: `ลบสำเร็จ`,
          isClosable: true,
          position: "top-right",
          duration: 10000,
        });
        refetch();
        onCloseAlert();
        setSubCategoryDelete({ id: 0, name: "", isShow: false });
      })
      .catch((err) => {
        toast({
          title: `ไม่สามารถเพิ่มตัวบ่งชี้นี้ได้`,
          status: "error",
          description: `${err.message.replace("GraphQL error:", "")}`,
          isClosable: true,
          position: "top-right",
          duration: 10000,
        });
      });
  };

  return (
    <>
      <AlertDialog
        isOpen={subCategoryDelete.isShow}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              ยืนยันการลบข้อมูล
            </AlertDialogHeader>

            <AlertDialogBody>
              คุณแน่ใจว่าจะลบตัวบ่งชี้
              <Text fontWeight="bold" color="red.400">
                {subCategoryDelete.name}
              </Text>
              การกระทำดังกล่าวจะไม่สามารถกู้คืนได้ ทั้งนี้
              ไฟล์เอกสารที่ได้อัปโหลดและเผยแพร่แล้ว จะไม่ถูกลบออกไปด้วย
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                ยกเลิก
              </Button>
              <Button colorScheme="red" onClick={(e) => onDelete(e)} ml={3}>
                ยืนยันการลบ
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Box bg="blue.100">
        <Flex
          minHeight="100vh"
          width="full"
          align="center"
          justifyContent="center"
          marginEnd={10}
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
            overflow="auto"
          >
            <Heading fontFamily="Kanit" fontSize="xl">
              {" "}
              จัดการหัวข้อเอกสาร{" "}
            </Heading>

            {!loading && !error && data ? (
              <>
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="whatsapp"
                  margin={5}
                  size="md"
                  variant="outline"
                  onClick={onOpen}
                >
                  เพิ่มตัวบ่งชี้
                </Button>
                <Accordion px={5} py={5}>
                  {data.AdminGetAllCategory.map((item: any, index: number) => (
                    <>
                      <AccordionItem>
                        <h2>
                          <AccordionButton
                            _expanded={{
                              bg: "blue.800",
                              color: "white",
                              borderRadius: 5,
                            }}
                          >
                            <Box flex="1" textAlign="left">
                              <Text fontFamily="Kanit" fontSize={18}>
                                {item.categoryName}
                              </Text>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        {item.SubCategory.map((item: any, index: number) => (
                          <AccordionPanel pb={4} key={item.id}>
                            <Link
                              color="blue.500"
                              as="span"
                              //  onClick={() => handleClick(item.id)}
                            >
                              {item.subCategoryName}
                            </Link>
                            <IconButton
                              colorScheme="green"
                              aria-label="Edit"
                              margin={3}
                              icon={<EditIcon />}
                              variant="solid"
                              size="sm"
                            />
                            <IconButton
                              colorScheme="red"
                              aria-label="Delete"
                              margin={3}
                              icon={<CloseIcon />}
                              variant="outline"
                              size="sm"
                              onClick={(e) =>
                                setSubCategoryDelete({
                                  id: item.id,
                                  name: item.subCategoryName,
                                  isShow: true,
                                })
                              }
                            />
                          </AccordionPanel>
                        ))}
                      </AccordionItem>
                    </>
                  ))}
                </Accordion>
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
          </Box>
        </Flex>
      </Box>
      {!loading && !error && data ? (
        <>
          {" "}
          <>
            {" "}
            <Drawer
              isOpen={isOpen}
              placement="right"
              initialFocusRef={firstField}
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="2px">
                  เพิ่มตัวบ่งชี้
                </DrawerHeader>

                <DrawerBody>
                  <Stack spacing="24px">
                    <Box>
                      <FormLabel htmlFor="owner">เลือกองค์ประกอบ</FormLabel>
                      <Select
                        id="owner"
                        defaultValue="segun"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option>เลือกองค์ประกอบ</option>
                        {data.AdminGetAllCategory.map(
                          (item: any, index: number) => (
                            <>
                              <option value={item.id} key={item.id}>
                                {item.categoryName}
                              </option>
                            </>
                          )
                        )}
                      </Select>
                    </Box>

                    <Box>
                      <FormLabel htmlFor="subCategory">ชื่อตัวบ่งชี้</FormLabel>
                      <Input
                        ref={firstField}
                        id="subCategory"
                        placeholder="(ตัวอย่าง) ตัวบ่งชี้ที่ 5.1 "
                        onChange={(e) => setSubCategory(e.target.value)}
                      />
                    </Box>
                  </Stack>
                </DrawerBody>

                <DrawerFooter borderTopWidth="2px">
                  <Button variant="outline" mr={3} onClick={onClose}>
                    ยกเลิก
                  </Button>
                  <Button
                    colorScheme="blue"
                    isDisabled={!category}
                    onClick={(e) => onSubmit(e)}
                  >
                    เพิ่มข้อมูล
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        </>
      ) : null}
    </>
  );
};

export default AddTopicForm;
