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
const VARIANT_COLOR: string = "blue";
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
            <Box my={8} textAlign="left">
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="#4A5568"
                alignItems="center"
                marginBottom={10}
              >
              เปลี่ยนเป็นข้อมูลเกี่ยวกับการขอรีเซ็ทรหัสผ่าน
              </Text>
              <form>
                <FormControl isRequired>
                  <FormLabel>ชื่อผู้ใช้ หรือ Email </FormLabel>
                  <Input type="text" placeholder="กรอกชื่อผู้ใช้งาน / Email" />
                </FormControl>

                <Stack isInline justifyContent="space-between" mt={4}>
                </Stack>

                <Button
                  variantColor={VARIANT_COLOR}
                  width="full"
                  mt={4}
                  colorScheme="blue"
                  type="submit"
                >
                  รีเซตรหัสผ่าน
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
    </Flex>
  );
};

export default ForgotPasswordForm;
