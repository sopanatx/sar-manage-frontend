import {
  Box,
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

const AddSemesterForm = () => {
  return (
    <>
      <Box bg="blue.100">
        <Flex
          minHeight="100vh"
          width="full"
          align="center"
          justifyContent="center"
        >
          <Box
            px={5}
            py={10}
            width="full"
            maxWidth="600px"
            borderRadius={4}
            // textAlign="center"
            boxShadow="md"
            bg="white"
          >
            <Text fontFamily="Kanit" fontSize={24} fontWeight="bold">
              เพิ่มปีการศึกษา
            </Text>
            <form>
              <FormControl id="fullname" py={5} isRequired>
                <FormLabel>ชื่อปีการศึกษา</FormLabel>
                <Input type="text" />
                <FormHelperText>
                  ตัวเลข หรือ ข้อความ เช่น "ปีการศึกษา 2565"
                </FormHelperText>
              </FormControl>
              <Button type="submit">ปรับปรุงข้อมูล</Button>
            </form>

            <Text fontFamily="Kanit" fontSize={24} fontWeight="bold" py={5}>
              จัดการปีการศึกษา
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AddSemesterForm;
