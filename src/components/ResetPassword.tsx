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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import GET_SERVICE_STATUS from "../queries/getServiceStatus";
import { useRouter } from "next/router";
import VALIDATE_PASSWORD_TOKEN from "../queries/validatePasswordToken";
import RESET_PASSWORD from "../mutation/resetPassword";
const testlalert = () => {
  alert(`หวัดดีค้าบ`);
};
const ResetPassword = () => {
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const VARIANT_COLOR: string = "blue";
  const { data, error, loading } = useQuery(VALIDATE_PASSWORD_TOKEN, {
    variables: { validatePasswordResetToken: { token: id } },
    fetchPolicy: "no-cache",
  });
  const [updatePassword, {}] = useMutation(RESET_PASSWORD);
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const onChangePassword = (e: any) => {
    if (Password != ConfirmPassword) {
      alert("รหัสผ่านทั้งสองไม่ตรงกัน");
    } else {
      updatePassword({
        variables: {
          resetPassword: {
            password: Password,
            token: id,
          },
        },
      })
        .then((res) => {
          toast({
            title: `สำเร็จ`,
            status: "success",
            description: `เปลี่ยนรหัสผ่านสำเร็จ`,
            isClosable: true,
            position: "top-right",
            duration: 10000,
          });
          router.push("/");
        })
        .catch((err) => {});
    }
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
      >
        <Box p={10}>
          <Box my={8} textAlign="left">
            {!loading && !error && data ? (
              <>
                {" "}
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  color="#4A5568"
                  alignItems="center"
                  marginBottom={10}
                >
                  ทำการสร้ารหัสผ่านใหม่ {id}
                </Text>
                <form>
                  <FormControl isRequired>
                    <FormLabel>รหัสผ่านใหม่ </FormLabel>
                    <Input
                      type="text"
                      placeholder="รหัสผ่าน / Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired py={5}>
                    <FormLabel>ยืนยันรหัสผ่านใหม่</FormLabel>
                    <Input
                      type="text"
                      placeholder="ยืนยันรหัสผ่าน / Confrim Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </FormControl>
                  <Stack isInline justifyContent="space-between" mt={4}></Stack>
                  <Button
                    variantColor={VARIANT_COLOR}
                    width="full"
                    mt={4}
                    colorScheme="blue"
                    type="submit"
                    onClick={onChangePassword}
                  >
                    ยืนยัน
                  </Button>
                </form>
              </>
            ) : (
              <>
                {error && !loading ? (
                  <>
                    <Text>
                      Token ไม่ถูกต้อง หรือหมดอายุแล้ว
                      จึงไม่สามารถเปลี่ยนรหัสผ่านได้{" "}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text>Validating token...</Text>
                  </>
                )}
              </>
            )}{" "}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default ResetPassword;
