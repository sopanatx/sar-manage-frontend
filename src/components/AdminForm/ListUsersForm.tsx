import { useState, useRef } from "react";
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
  useToast,
  Stack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import ADMIN_GET_ALL_USER from "../../queries/AdminGetAllUser";
import { useQuery } from "@apollo/client";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import router from "next/router";
interface isOpenType {
  dialog: boolean;
  id: string;
  name: string;
}

const ListUsersForm = () => {
  const toast = useToast();
  const { data, error, loading } = useQuery(ADMIN_GET_ALL_USER);
  const [isOpen, setIsOpen] = useState<isOpenType>({
    dialog: false,
    id: "",
    name: "",
  });
  const onClose = () => setIsOpen({ dialog: false, id: "", name: "" });
  const cancelRef = useRef<any>();
  if (!loading && error) {
    toast({
      title: `ไม่สามารถรับข้อมูลได้`,
      status: "error",
      description: `${error.message.replace("GraphQL error:", "")}`,
      isClosable: true,
      position: "top-right",
      duration: 10000,
    });
  }
  return (
    <>
      <Box bg="blue.100">
        {/* <Button
          colorScheme="red"
          // onClick={() => setIsOpen({ dialog: true, id: "" })}
        >
          Delete Customer
        </Button> */}
        <AlertDialog
          isOpen={isOpen.dialog}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                ยืนยันการลบข้อมูล
              </AlertDialogHeader>

              <AlertDialogBody>
                คุณแน่ใจว่าจะบัญชีของ
                <Text fontWeight="bold" color="red.400">
                  {isOpen.name}{" "}
                </Text>{" "}
                {""}หรือไม่ เจ้าของบัญชีนี้
                จะไม่สามารถเข้าถึงบัญชีนี้ได้อีกต่อไป และ
                การกระทำดังกล่าวจะไม่สามารถกู้คืนได้ ทั้งนี้
                ไฟล์ที่ได้อัปโหลดไว้ จะไม่ถูกลบออกไปด้วย
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  ยกเลิก
                </Button>
                <Button colorScheme="red" onClick={onClose} ml={3}>
                  ยืนยันการลบ
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Flex
          minHeight="100vh"
          width="full"
          align="center"
          justifyContent="center"
          flexWrap="wrap"
        >
          <Box
            px={5}
            py={10}
            width="full"
            minWidth="300px"
            as="td"
            borderRadius={4}
            textAlign="center"
            boxShadow="md"
            bg="white"
            maxWidth="fit-content"
          >
            {!loading && !error && data ? (
              <>
                <Text fontFamily="Kanit" fontSize={24} fontWeight="bold">
                  แสดงข้อมูลผู้ใช้ทั้งหมด
                </Text>

                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>ลำดับ</Th>
                      <Th>ชื่อ</Th>
                      <Th>Username</Th>
                      <Th>อีเมล</Th>
                      <Th>สิทธิ์</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.AdminGetAllUser.map((data: any, index: number) => (
                      <>
                        <Tr>
                          <Td>{index + 1}</Td>
                          <Td>{data.fullname}</Td>
                          <Td>{data.username}</Td>
                          <Td>{data.email}</Td>
                          <Td>{data.userLevel}</Td>
                          <Td>
                            <Stack direction="row" spacing={4}>
                              <Button
                                rightIcon={<EditIcon />}
                                colorScheme="green"
                                variant="ghost"
                                onClick={() =>
                                  router.push(`/admin/users/${data.id}`)
                                }
                              >
                                ปรับปรุง
                              </Button>

                              <Button
                                rightIcon={<CloseIcon />}
                                colorScheme="red"
                                variant="ghost"
                                onClick={() =>
                                  setIsOpen({
                                    dialog: true,
                                    id: data.id,
                                    name: data.fullname,
                                  })
                                }
                              >
                                ลบ
                              </Button>
                            </Stack>
                          </Td>
                        </Tr>
                      </>
                    ))}
                  </Tbody>
                </Table>
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
                    <Text> Loading ..</Text>
                  </>
                )}
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default ListUsersForm;