import { Box, extendTheme, Heading, useColorMode } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import HelperImage from "./HelperImage";

const SomeText = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Box
        backgroundColor={colorMode === "light" ? "gray.300" : "gray.600"}
        padding={4}
        borderRadius={4}
      >
        <Box d="flex" alignItems="center" fontSize="xl">
          <Text fontSize="lg">
            โปรดเข้าสู่ระบบด้วยข้อมูลของท่าน ก่อนดำเนินการอัปโหลดไฟล์
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default SomeText;
