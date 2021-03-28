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

const VARIANT_COLOR: string = "blue";
const testlalert = () => {
  alert(`หวัดดีค้าบ`);
};
const ResetPassword = () => {
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
              ทำการสร้ารหัสผ่านใหม่
            </Text>
            <form>
              <FormControl isRequired>
                <FormLabel>รหัสผ่านใหม่ </FormLabel>
                <Input type="text" placeholder="กรอกชื่อผู้ใช้งาน / Email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>ยืนยันรหัสผ่านใหม่</FormLabel>
                <Input type="text" placeholder="กรอกชื่อผู้ใช้งาน / Email" />
              </FormControl>
              <Stack isInline justifyContent="space-between" mt={4}></Stack>
              <Button
                variantColor={VARIANT_COLOR}
                width="full"
                mt={4}
                colorScheme="blue"
                type="submit"
              >
                ยืนยัน
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default ResetPassword;
