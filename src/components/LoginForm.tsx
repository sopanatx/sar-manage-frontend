import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Link,
  Flex,
  Text,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-apollo";
import GET_SERVICE_STATUS from "../queries/getServiceStatus";
const VARIANT_COLOR: string = "orange";
const testlalert = () => {
  alert(`หวัดดีค้าบ`);
};

const LoginForm = () => {
  const { data, error, loading } = useQuery(GET_SERVICE_STATUS);
  console.log(data);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      {!loading && !error && data ? (
        <Box
          borderWidth={1}
          px={5}
          width="full"
          maxWidth="500px"
          borderRadius={4}
          textAlign="center"
          boxShadow="lg"
        >
          <Box p={10}>
            <Box my={8} textAlign="left">
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="#4A5568"
                alignItems="center"
                marginBottom={10}
              >
                เข้าสู่ระบบจัดการเอกสาร
              </Text>
              <form>
                <FormControl isRequired>
                  <FormLabel>ชื่อผู้ใช้ </FormLabel>
                  <Input
                    type="text"
                    placeholder="กรอกชื่อผู้ใช้งาน"
                    onChange={(event) => setUsername(event.currentTarget.value)}
                  />
                </FormControl>

                <FormControl mt={4} isRequired>
                  <FormLabel>รหัสผ่าน</FormLabel>
                  <Input
                    type="password"
                    placeholder="กรอกรหัสผ่าน"
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                </FormControl>

                <Stack isInline justifyContent="space-between" mt={4}>
                  <Box>
                    <Checkbox colorScheme="orange">จดจำการเข้าสู่ระบบ</Checkbox>
                  </Box>
                  <Box>
                    <Link color={`${VARIANT_COLOR}.500`} href="login">
                      ลืมรหัสผ่าน?
                    </Link>
                  </Box>
                </Stack>

                <Button
                  variantColor={VARIANT_COLOR}
                  width="full"
                  mt={4}
                  colorScheme={VARIANT_COLOR}
                  type="submit"
                  onClick={() => testlalert()}
                >
                  เข้าสู่ระบบ
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Text>Connecting to the server...</Text>
        </>
      )}
    </Flex>
  );
};

export default LoginForm;
