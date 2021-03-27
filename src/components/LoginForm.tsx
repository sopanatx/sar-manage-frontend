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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";
import GET_SERVICE_STATUS from "../queries/getServiceStatus";
import SIGN_IN, {
  Credentials as UsernameCredentails,
  SignInOutput,
} from "../queries/signIn";
import { useForm } from "react-hook-form";
const VARIANT_COLOR: string = "orange";
const testlalert = () => {
  alert(`หวัดดีค้าบ`);
};

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { data, error, loading } = useQuery(GET_SERVICE_STATUS);
  const [signIn, { data: credentails }] = useMutation<SignInOutput>(SIGN_IN);
  const { register, handleSubmit, errors } = useForm();
  const [isError, setIsError] = useState(false);
  const onSubmit = () => {
    signIn({ variables: { input: { username, password } } })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        setIsError(true);
      });
  };
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      {!loading && !error && data ? (
        <Box
          borderWidth={1}
          px={5}
          width="full"
          maxWidth="600px"
          borderRadius={4}
          textAlign="center"
          boxShadow="lg"
          onSubmit={handleSubmit(onSubmit)}
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
                {data.getServiceStatus.serviceName}
              </Text>
              <form>
                {isError ? (
                  <>
                    <Box my={2}>
                      <Alert status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>เข้าสู่ระบบล้มเหลว</AlertTitle>
                      </Alert>
                    </Box>
                  </>
                ) : null}
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
