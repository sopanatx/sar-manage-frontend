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
} from "@chakra-ui/react";

import SomeText from "../components/SomeText";
import SomeImage from "../components/SomeImage";
import CTASection from "../components/CTASection";
const VARIANT_COLOR = "blue";
const Home = () => {
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
      >
        <Box p={4}>
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
              <FormControl>
                <FormLabel>ชื่อผู้ใช้</FormLabel>
                <Input type="email" placeholder="กรอกชื่อผู้ใช้งาน" required />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>รหัสผ่าน</FormLabel>
                <Input type="password" placeholder="กรอกรหัสผ่าน" />
              </FormControl>

              <Stack isInline justifyContent="space-between" mt={4}>
                <Box>
                  <Checkbox>จดจำการเข้าสู่ระบบ</Checkbox>
                </Box>
                <Box>
                  <Link color={`${VARIANT_COLOR}.500`}> ลืมรหัสผ่าน? </Link>
                </Box>
              </Stack>

              <Button
                variantColor={VARIANT_COLOR}
                width="full"
                mt={4}
                colorScheme="blue"
              >
                เข้าสู่ระบบ
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
