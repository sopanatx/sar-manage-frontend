import {
  Box,
  Button,
  Heading,
  Text,
  Image,
  Link as ChakraLink,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";

const Page404 = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Box width={["100%", "70%", "60%", "60%"]} margin="0 auto">
        <Image src="/404 Error-pana.svg" />
      </Box>

      <Box marginY={4}>
        <Heading textAlign="center">ไม่พบหน้าเพจดังกล่าว</Heading>

        <Box textAlign="center" marginTop={4}>
          <Text>
            โปรดตรวจสอบว่า URL ที่ท่านเข้าถึงถูกต้องแล้ว ลองใหม่อีกครั้ง
          </Text>
          <Link href="/" passHref>
            <Button
              backgroundColor={colorMode === "light" ? "gray.300" : "teal.500"}
              marginTop={5}
            >
              กลับไปเพจก่อนหน้า
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Page404;
