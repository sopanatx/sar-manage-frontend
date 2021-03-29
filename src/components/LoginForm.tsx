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
  Spacer,
  CloseButton,
  InputLeftElement,
  Icon,
  InputGroup,
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
import React from "react";
import Footer from "./layout/Footer";
import changePreview from "../pages/index";
import { FaRegEnvelope, FaLock } from "react-icons/fa";
import { useRouter } from "next/router";
interface AuthResponse {
  data: string;
  error: string;
  loading: boolean;
}

const VARIANT_COLOR: string = "facebook";
const testlalert = () => {
  alert(`หวัดดีค้าบ`);
};

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { data, error, loading } = useQuery(GET_SERVICE_STATUS);
  const [
    signIn,
    { data: authData, error: authError, loading: loadings },
  ] = useMutation<SignInOutput>(SIGN_IN);
  const { register, handleSubmit, errors } = useForm();
  const [isError, setIsError] = useState(false);

  const onSubmit = () => {
    signIn({ variables: { input: { username, password } } })
      .then((result) => {
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(authError);
        setIsError(true);
      });
  };
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      {!loading && !error && data ? (
        <Box
          // borderWidth={1}
          //      boxShadow="lg"
          px={5}
          width="full"
          maxWidth="600px"
          borderRadius={9}
          textAlign="center"
          onSubmit={handleSubmit(onSubmit)}
          bg="white"
          p={5}
        >
          <Box p={10}>
            <Box my={8} textAlign="center">
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
                {!authData && !loadings && authError ? (
                  <>
                    <Alert status="error" variant="left-accent" my={8}>
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>เข้าสู่ระบบล้มเหลว</AlertTitle>
                        <AlertDescription display="block">
                          {authError.message.replace("GraphQL error:", "")}
                        </AlertDescription>
                      </Box>
                      <CloseButton position="absolute" right="8px" top="8px" />
                    </Alert>
                  </>
                ) : (
                  <></>
                )}

                {authData && !loadings && !authError ? (
                  <>
                    <Alert status="success" variant="left-accent" my={8}>
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>เข้าสู่ระบบสำเร็จแล้ว</AlertTitle>
                        <AlertDescription display="block">
                          ระบบ กำลังพาท่านไปยังหน้าจัดการเอกสาร....
                        </AlertDescription>
                      </Box>
                      <CloseButton position="absolute" right="8px" top="8px" />
                    </Alert>
                  </>
                ) : (
                  <></>
                )}
                <FormControl isRequired>
                  <FormLabel>ชื่อผู้ใช้ </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      children={
                        <Icon
                          as={FaRegEnvelope}
                          color="secondary.inputHelper"
                        />
                      }
                    />
                    <Input
                      type="text"
                      placeholder="กรอกชื่อผู้ใช้งาน"
                      onChange={(event) =>
                        setUsername(event.currentTarget.value)
                      }
                    />
                  </InputGroup>
                </FormControl>

                <FormControl mt={4} isRequired>
                  <FormLabel>รหัสผ่าน</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      children={
                        <Icon as={FaLock} color="secondary.inputHelper" />
                      }
                    />
                    <Input
                      type="password"
                      placeholder="กรอกรหัสผ่าน"
                      onChange={(event) =>
                        setPassword(event.currentTarget.value)
                      }
                    />
                  </InputGroup>
                </FormControl>

                <Stack isInline justifyContent="space-between" mt={4}>
                  <Box>
                    <Checkbox colorScheme="orange">จดจำการเข้าสู่ระบบ</Checkbox>
                  </Box>
                  <Box>
                    <Link color={`${VARIANT_COLOR}.500`} href="/forgotPassword">
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
                  variant="solid"
                >
                  เข้าสู่ระบบ
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            borderWidth={1}
            px={5}
            width="full"
            maxWidth="600px"
            borderRadius={4}
            textAlign="center"
            boxShadow="lg"
            onSubmit={handleSubmit(onSubmit)}
            bg="white"
          >
            <Box p={10}>
              <Box my={8} textAlign="center">
                <Text
                  fontSize="1xl"
                  fontWeight="bold"
                  color="#4A5568"
                  alignItems="center"
                  marginBottom={10}
                >
                  {" "}
                  Connecting to the server...
                </Text>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Flex>
  );
};

export default LoginForm;
