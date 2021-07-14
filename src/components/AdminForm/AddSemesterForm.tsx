import {
  Box,
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import GET_SEMESTER from "../../queries/getSemester";
import { useQuery } from "@apollo/client";
const AddSemesterForm = () => {
  const { data, error, loading } = useQuery(GET_SEMESTER);
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

            {!loading && !error && data ? (
              <>
                {" "}
                <Text fontFamily="Kanit" fontSize={24} fontWeight="bold" py={5}>
                  จัดการปีการศึกษา
                </Text>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>ลำดับ</Th>
                      <Th>into</Th>
                      <Th isNumeric>multiply by</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>inches</Td>
                      <Td>millimetres (mm)</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                      <Td>feet</Td>
                      <Td>centimetres (cm)</Td>
                      <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                      <Td>yards</Td>
                      <Td>metres (m)</Td>
                      <Td isNumeric>0.91444</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </>
            ) : (
              <>
                <Text>Loading</Text>
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AddSemesterForm;
