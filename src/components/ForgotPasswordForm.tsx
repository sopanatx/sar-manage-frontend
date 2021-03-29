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
  useColorMode,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spacer,
  CloseButton,
  InputLeftElement,
  Icon,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";
import GET_SERVICE_STATUS from "../queries/getServiceStatus";
import REQUEST_PASSWORD_RESET, {
  PasswordResetOutput,
} from "../mutation/requestPasswordReset";
import { useForm } from "react-hook-form";
import { FaRegEnvelope, FaLock } from "react-icons/fa";
import { useRouter } from "next/router";
import Reaptcha from "reaptcha";

const VARIANT_COLOR: string = "facebook";
const testlalert = () => {
  alert(`หวัดดีค้าบ`);
};
const ForgotPasswordForm = () => {
  const toast = useToast();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [verify, setVerify] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [
    requestPasswordReset,
    { data, error, loading },
  ] = useMutation<PasswordResetOutput>(REQUEST_PASSWORD_RESET);
  const onSubmit = () => {
    requestPasswordReset({ variables: { input: { username } } })
      .then((result) => {
        toast({
          title: `ดำเนินการสำเร็จ`,
          status: "success",
          description: `โปรดตรวจสอบอีเมลของท่านเพื่อทำการรีเซ็ทรหัสผ่าน`,
          isClosable: true,
          position: "top-right",
          duration: 4000,
        });
        router.push("/");
      })
      .catch((error) => {
        toast({
          title: `ไม่สามารถดำเนินการได้`,
          status: "error",
          description: `${error.message.replace("GraphQL error:", "")}`,
          isClosable: true,
          position: "top-right",
          duration: 1000,
        });
      });
  };
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box
        //borderWidth={1}
        px={5}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        //   boxShadow="lg"
        onSubmit={handleSubmit(onSubmit)}
        bg="white"
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
              กู้คืนรหัสผ่าน
            </Text>

            <form>
              <FormControl isRequired>
                <FormLabel>กรอกชื่อผู้ใช้</FormLabel>

                <InputGroup>
                  <InputLeftElement
                    children={
                      <Icon as={FaRegEnvelope} color="secondary.inputHelper" />
                    }
                  />
                  <Input
                    type="text"
                    placeholder="กรอกชื่อผู้ใช้งาน"
                    onChange={(event) => setUsername(event.currentTarget.value)}
                  />
                </InputGroup>
              </FormControl>

              <Box mt={4} align="center">
                <Reaptcha
                  sitekey="6LcApJIaAAAAALZZaB-lVhqiRBJ6ObWvnZm5QS-C"
                  onVerify={() => setVerify(true)}
                />
              </Box>
              <Stack isInline justifyContent="space-between" mt={4}></Stack>

              <Button
                variantColor={VARIANT_COLOR}
                width="full"
                mt={4}
                colorScheme={VARIANT_COLOR}
                type="submit"
                isDisabled={!verify}
              >
                กู้คืนรหัสผ่าน
              </Button>
              <Box my={8} textAlign="center">
                <Link color={`${VARIANT_COLOR}.500`} href="/">
                  กลับไปเพจก่อนหน้า
                </Link>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default ForgotPasswordForm;
