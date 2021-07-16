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
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import ADMIN_GET_USER from "../../queries/AdminGetUser";
import ADMIN_UPDATE_USER from "../../mutation/AdminUpdateUser";
import { useQuery, useMutation } from "@apollo/client";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import router from "next/router";
const ListUsersForm = ({ userId }: any) => {
  const [fullname, setFullname] = useState<String | null>();
  const [email, setEmail] = useState<String | null>();
  const [username, setUsername] = useState<String | null>();
  const [password, setPassword] = useState<String | null>();
  const [userLevel, setUserLevel] = useState<String | null>();
  const toast = useToast();
  const [
    updateUser,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation(ADMIN_UPDATE_USER);
  const { data, error, loading } = useQuery(ADMIN_GET_USER, {
    variables: {
      input: { userId },
    },
    fetchPolicy: "network-only",
  });

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
  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateUser({
      variables: {
        input: {
          userId,
          username,
          fullname,
          email,
          password,
          userLevel,
        },
      },
    })
      .then(() => {
        toast({
          title: `ดำเนินการสำเร็จ`,
          status: "success",
          description: `ปรับปรุงข้อมูลบัญชีสำเร็จแล้ว`,
          isClosable: true,
          position: "top-right",
          duration: 5000,
        });
        router.push(`/admin/users`);
      })
      .catch((e) => {
        toast({
          title: `ปรับปรุงข้อมูลล้มเหลว`,
          status: "error",
          description: `${e}`,
          isClosable: true,
          position: "top-right",
          duration: 5000,
        });
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
          flexWrap="wrap"
        >
          <Box
            px={5}
            py={10}
            width="full"
            minWidth="100px"
            minHeight="100px"
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
                  แก้ไขข้อมูลของ : {data.AdminGetUser.fullname}
                </Text>

                <form onSubmit={handleSubmit}>
                  <FormControl id="fullname" py={5} isRequired>
                    <FormLabel>ชื่อ-สกุล</FormLabel>
                    <Input
                      type="fullname"
                      defaultValue={data.AdminGetUser.fullname}
                      onChange={(e: any) => setFullname(e.target.value)}
                    />
                    <FormHelperText>
                      ชื่อ-นามสกุลจริง ภาษาไทย หรือ อังกฤษ อักขระ.
                    </FormHelperText>
                  </FormControl>

                  <FormControl id="email">
                    <FormLabel>อีเมล</FormLabel>
                    <Input
                      type="email"
                      defaultValue={data.AdminGetUser.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormHelperText>
                      ใช้งานอีเมลที่เข้าถึงได้ สำหรับกรณีกู้คืนรหัสผ่านบัญชี
                      หรือการแจ้งเตือนอื่นๆ
                    </FormHelperText>
                  </FormControl>

                  <FormControl id="username" py={2}>
                    <FormLabel>ชื่อผู้ใช้</FormLabel>
                    <Input
                      type="text"
                      defaultValue={data.AdminGetUser.username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <FormHelperText>
                      ชื่อผู้ใช้สำหรับใช้งานในการเข้าสู่ระบบ
                    </FormHelperText>
                  </FormControl>
                  <FormControl>
                    <FormLabel>ระดับสิทธิ์ผู้ใช้</FormLabel>
                    <Select
                      placeholder="เลือกสิทธิ์"
                      onChange={(e) => setUserLevel(e.target.value)}
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </Select>
                    <FormHelperText>
                      User = สิทธิ์ทั่วไป / Admin = สิทธิ์สูงสุด
                      สามารถปรับเปลี่ยนการตั้งค่าระบบได้
                    </FormHelperText>
                  </FormControl>

                  <FormControl id="new-password">
                    <FormLabel>รหัสผ่าน</FormLabel>
                    <Input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormHelperText>
                      *หากไม่ต้องการเปลี่ยนรหัสผ่าน ให้เว้นว่างไว้
                    </FormHelperText>
                  </FormControl>
                  <Button type="submit">ปรับปรุงข้อมูล</Button>
                </form>
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
