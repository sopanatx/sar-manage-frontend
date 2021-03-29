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
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";
import GET_SERVICE_STATUS from "../queries/getServiceStatus";
import REQUEST_PASSWORD_RESET, {
  PasswordResetOutput,
} from "../mutation/requestPasswordReset";
import { useForm } from "react-hook-form";
const VARIANT_COLOR: string = "facebook";
const testlalert = () => {
  alert(`หวัดดีค้าบ`);
};
const ForgotPasswordForm = () => {
  const [username, setUsername] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const [
    requestPasswordReset,
    { data, error, loading },
  ] = useMutation<PasswordResetOutput>(REQUEST_PASSWORD_RESET);
  const onSubmit = () => {
    requestPasswordReset({ variables: { input: { username } } })
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box
        borderWidth={1}
        px={5}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
        onSubmit={handleSubmit(onSubmit)}
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

            {!data && !loading && error ? (
              <>
                <Alert status="error" variant="left-accent" my={8}>
                  <AlertIcon />
                  <Box flex="1">
                    <AlertTitle>ไม่สามารถดำเนินการได้</AlertTitle>
                    <AlertDescription display="block">
                      {error.message.replace("GraphQL error:", "")}
                    </AlertDescription>
                  </Box>
                  <CloseButton position="absolute" right="8px" top="8px" />
                </Alert>
              </>
            ) : (
              <></>
            )}
            {data && !loading && !error ? (
              <>
                <Alert status="success" variant="left-accent" my={8}>
                  <AlertIcon />
                  <Box flex="1">
                    <AlertTitle>ดำเนินการสำเร็จ</AlertTitle>
                    <AlertDescription display="block">
                      {data.requestPasswordReset.statusMessage}
                    </AlertDescription>
                  </Box>
                  <CloseButton position="absolute" right="8px" top="8px" />
                </Alert>
              </>
            ) : (
              <></>
            )}
            <form>
              <FormControl isRequired>
                <FormLabel>กรอกชื่อผู้ใช้</FormLabel>
                <Input
                  type="text"
                  placeholder="กรอกชื่อผู้ใช้งาน"
                  onChange={(event) => setUsername(event.currentTarget.value)}
                />
              </FormControl>

              <Stack isInline justifyContent="space-between" mt={4}></Stack>

              <Button
                variantColor={VARIANT_COLOR}
                width="full"
                mt={4}
                colorScheme={VARIANT_COLOR}
                type="submit"
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
