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
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-apollo";
import GET_SERVICE_STATUS from "../queries/getServiceStatus";
const VARIANT_COLOR: string = "facebook";
const testlalert = () => {
  alert(`หวัดดีค้าบ`);
};
const ForgotPasswordForm = () => {
  const { data, error, loading } = useQuery(GET_SERVICE_STATUS);
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
                <Input type="text" placeholder="กรอกชื่อผู้ใช้งาน" />
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
