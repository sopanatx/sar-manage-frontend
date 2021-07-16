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
import { CloseIcon } from "@chakra-ui/icons";
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
                      <Th>ชื่อปีการศึกษา</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.getSemester.map((data: any, index: number) => (
                      <>
                        <Tr>
                          <Td>{index}</Td>
                          <Td>{data.semesterName}</Td>
                          <Td>
                            <Button>
                              <CloseIcon color="red.500" />
                            </Button>
                          </Td>
                        </Tr>
                      </>
                    ))}
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
