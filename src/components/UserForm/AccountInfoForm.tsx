import {
  Box,
  Stack,
  Button,
  Flex,
  Text,
  Select,
  Spinner,
  Alert,
  AlertIcon,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  useToast,
} from "@chakra-ui/react";
import router from "next/router";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import MY_ACCOUNT_INFO from "../../queries/myaccountinfo";
import UPDATE_ACCOUNT_INFO from "../../mutation/UpdateAccountInfo";
const VARIANT_COLOR = "blue";

const AccountInfoForm = () => {
  const toast = useToast();

  const [fullname, setFullname] = useState<String | null>();
  const [email, setEmail] = useState<String | null>();
  const [username, setUsername] = useState<String | null>();
  const [password, setPassword] = useState<String | null>();
  const { data, loading, error } = useQuery(MY_ACCOUNT_INFO, {
    fetchPolicy: "network-only",
  });
  const [UpdateAccountInfo, {}] = useMutation(UPDATE_ACCOUNT_INFO);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    UpdateAccountInfo({
      variables: {
        input: {
          fullname,
          email,
          username,
          password,
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
      })
      .catch((e) => {
        toast({
          title: `อัปโหลดไฟล์เอกสารไม่สำเร็จ`,
          status: "error",
          description: `${e}`,
          isClosable: true,
          position: "top-right",
          duration: 5000,
        });
      });
  };
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
          maxWidth="600px"
          borderRadius={4}
          // textAlign="center"
          boxShadow="md"
          bg="white"
        >
          <Text fontFamily="Kanit" fontSize={24} fontWeight="bold">
            ข้อมูลบัญชี
          </Text>
          <Alert status="info" variant="top-accent" borderRadius={6}>
            <AlertIcon />
            ท่านสามารถปรับปรุงข้อมูลบัญชีได้ทันที
            โดยทำการเปลี่ยนข้อมูลตามต้องการ หลังจากนั้นให้ทำการกดบันทีก
          </Alert>
          {!loading && !error && data ? (
            <>
              <form onSubmit={handleSubmit}>
                <FormControl id="fullname" py={5} isRequired>
                  <FormLabel>ชื่อ-สกุล</FormLabel>
                  <Input
                    type="fullname"
                    defaultValue={data.MyAccountInfo.fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                  <FormHelperText>
                    ชื่อ-นามสกุลจริง ภาษาไทย หรือ อังกฤษ อักขระ.
                  </FormHelperText>
                </FormControl>

                <FormControl id="email">
                  <FormLabel>อีเมล</FormLabel>
                  <Input
                    type="email"
                    defaultValue={data.MyAccountInfo.email}
                    onChange={(e) => setFullname(e.target.value)}
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
                    defaultValue={data.MyAccountInfo.username}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                  <FormHelperText>
                    ชื่อผู้ใช้สำหรับใช้งานในการเข้าสู่ระบบ
                  </FormHelperText>
                </FormControl>

                <FormControl id="new-password">
                  <FormLabel>รหัสผ่าน</FormLabel>
                  <Input type="password" />
                  <FormHelperText>
                    *หากไม่ต้องการเปลี่ยนรหัสผ่าน ให้เว้นว่างไว้
                  </FormHelperText>
                </FormControl>
                <Button type="submit">ปรับปรุงข้อมูล</Button>
              </form>
            </>
          ) : null}
        </Box>
      </Flex>
    </Box>
  );
};

export default AccountInfoForm;
