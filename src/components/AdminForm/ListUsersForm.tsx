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
  Spinner,
} from "@chakra-ui/react";
import ADMIN_GET_ALL_USER from "../../queries/AdminGetAllUser";
import { useQuery, useMutation } from "@apollo/client";
import { CloseIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import router from "next/router";
import DELETE_USER_MUTATION from "../../mutation/AdminDeleteUser";
interface isOpenType {
  dialog: boolean;
  id: string;
  name: string;
}

interface isDeleteType {
  loading: boolean;
  error: boolean;
  data: any;
}

const ListUsersForm = () => {
  const toast = useToast();
  const { data, error, loading } = useQuery(ADMIN_GET_ALL_USER);
  const [deleteUser, {}] = useMutation(DELETE_USER_MUTATION);
  const [isOpen, setIsOpen] = useState<isOpenType>({
    dialog: false,
    id: "",
    name: "",
  });

  const onClose = () => setIsOpen({ dialog: false, id: "", name: "" });
  const cancelRef = useRef<any>();
  const onDeleteUser = (event: any) => {
    event.preventDefault();
    deleteUser({
      variables: {
        adminDeleteUser: {
          userId: isOpen.id,
        },
      },
    })
      .then(() => {
        toast({
          title: `สำเร็จ`,
          status: "warning",
          description: `ลบข้อมูลสำเร็จแล้ว`,
          isClosable: true,
          position: "top-right",
          duration: 10000,
        });
        setIsOpen({ dialog: false, id: "", name: "" });
      })
      .catch((err) => {
        toast({
          title: `ลบไม่สำเร็จ`,
          status: "error",
          description: `${err.message.replace("GraphQL error:", "")}`,
          isClosable: true,
          position: "top-right",
          duration: 10000,
        });
      });
  };

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
                <Button
                  colorScheme="red"
                  onClick={(e) => onDeleteUser(e)}
                  ml={3}
                >
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
            overflow="auto"
          >
            {!loading && !error && data ? (
              <>
                <Text fontFamily="Kanit" fontSize={24} fontWeight="bold">
                  แสดงข้อมูลผู้ใช้ทั้งหมด
                </Text>
                <Button
                  alignSelf="right"
                  leftIcon={<AddIcon />}
                  colorScheme="teal"
                  variant="outline"
                  py={15}
                  onClick={() => router.push(`/admin/users/add`)}
                >
                  {" "}
                  เพิ่มผู้ใช้งาน{" "}
                </Button>
                <Box overflowX="auto">
                  {" "}
                  <Table variant="simple" size="md">
                    <Thead>
                      <Tr>
                        <Th>ลำดับ</Th>
                        <Th>ชื่อ</Th>
                        <Th>Username</Th>
                        <Th>อีเมล</Th>
                        <Th>สิทธิ์</Th>
                        <Th>จัดการ</Th>
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
                </Box>
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
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default ListUsersForm;
