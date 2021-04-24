import {
  Box,
  Flex,
  Text,
  Table,
  TableCaption,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Tfoot,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useQuery } from "react-apollo";
import { WarningIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/react-hooks";
const VARIANT_COLOR = "blue";
const ViewSemesterForm = ({ semester }: any) => {
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
          maxWidth="700px"
          maxHeight="800px"
          borderRadius={4}
          textAlign="center"
          // boxShadow="lg"
          bg="white"
        >
          <Box>
            <Text fontFamily="kanit" fontSize="1xl">
              สถานะการอัปโหลดเอกสารภาคเรียนที่ : {semester}
            </Text>
            <Icon
              as={WarningIcon}
              w={10}
              h={10}
              margin={3}
              color="orange.400"
            />
            <Text
              fontFamily="kanit"
              fontSize="2xl"
              fontWeight="bold"
              px={5}
              color="green.400"
            >
              ยังอัปโหลดไม่ครบ
            </Text>

            <Button margin={10} px={5}>
              จัดการหลักฐาน
            </Button>
            <Table variant="striped" colorScheme={VARIANT_COLOR}>
              <TableCaption>
                แสดงรายการเอกสารตามลำดับจากการจัดเรียงของผู้ดูแลระบบ
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>องค์ประกอบ</Th>
                  <Th>หลักฐาน</Th>
                  <Th>สถานะ</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>องค์ 1</Td>
                  <Td>ไม่มี</Td>
                  <Td>ยังไม่ได้เผยแพร่</Td>
                </Tr>
                <Tr>
                  <Td>องค์ 2</Td>
                  <Td>ไม่มี</Td>
                  <Td>ยังไม่ได้เผยแพร่</Td>
                </Tr>
                <Tr>
                  <Td>องค์ 3</Td>
                  <Td>ไม่มี</Td>
                  <Td>ยังไม่ได้เผยแพร่</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ViewSemesterForm;
