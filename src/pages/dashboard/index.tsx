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
  Select,
} from "@chakra-ui/react";

const VARIANT_COLOR = "blue";

const Dashboard = () => {
  return (
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
          textAlign="center"
          boxShadow="lg"
          bg="white"
        >
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              โปรดเลือกปีการศึกษา
            </Text>
            <Select size="md" my="8px" mx="8px">
              <option value="option1">ปีการศึกษา 2561</option>
              <option value="option2">ปีการศึกษา 2562</option>
              <option value="option3">ปีการศึกษา 2563</option>
            </Select>
          </Box>
          <Button colorScheme="blue" variant="outline">
            ยืนยัน
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;
