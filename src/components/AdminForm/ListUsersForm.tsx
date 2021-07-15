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
} from "@chakra-ui/react";
import ADMIN_GET_ALL_USER from "../../queries/AdminGetAllUser";
import { useQuery } from "@apollo/client";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
const ListUsersForm = () => {
  const toast = useToast();
  const { data, error, loading } = useQuery(ADMIN_GET_ALL_USER);
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
            minWidth="100px"
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
                                variant="outline"
                              >
                                ปรับปรุง
                              </Button>

                              <Button
                                rightIcon={<CloseIcon />}
                                colorScheme="red"
                                variant="solid"
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
