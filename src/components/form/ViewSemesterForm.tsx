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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/react-hooks";
import { WarningIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/react-hooks";
import ShowCategories from "../../pages/dashboard/semester/[pid]";
import router from "next/router";
import { useState, useEffect } from "react";
import GET_CATEGORY_SEMESTER from "../../queries/searchFileBySemester";
const VARIANT_COLOR = "blue";

const ViewSemesterForm = ({ semester }: any) => {
  const [isShowingList, setIsShowingList] = useState(false);
  const { data, error, loading } = useQuery(GET_CATEGORY_SEMESTER, {
    variables: { input: { semester: semester } },
  });
  useEffect(() => {});
  return (
    <Box bg="blue.100">
      {isShowingList ? <ListCategories /> : ""}

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
          {!loading && !error && data ? (
            <>
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

                <Button
                  colorScheme="blue"
                  margin={10}
                  px={5}
                  onClick={() => setIsShowingList(true)}
                >
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
                      <Th>แก้ไขล่าสุด</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.searchFileBySemester.map((item: any, index: any) => (
                      <>
                        <Tr>
                          <Td>{item.categoryName}</Td>
                          <Td>
                            {item.FileUploadData.map(
                              (item: any, index: any) => (
                                <Text>{item.index}</Text>
                              )
                            )}
                          </Td>
                          <Td>-</Td>
                        </Tr>
                      </>
                    ))}
                  </Tbody>
                </Table>
              </Box>{" "}
            </>
          ) : (
            <>
              <Text>Loading</Text>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

const ListCategories = () => {
  return (
    <Flex minHeight="30vh" width="full" align="center" justifyContent="center">
      {" "}
      <Box
        margin={5}
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
        <Text> จัดการเอกสารตามหมวดหมู่ </Text>
        <Accordion defaultIndex={[0]} allowMultiple variant="blue">
          <AccordionItem borderRadius={9}>
            <h2>
              <AccordionButton
                _expanded={{ bg: "blue.600", color: "white", borderRadius: 5 }}
              >
                <Box flex="1" textAlign="left">
                  องค์ประกอบ 1
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>ตัวบ่งชี้ 1.1</AccordionPanel>
          </AccordionItem>
          <AccordionItem borderRadius={9}>
            <h2>
              <AccordionButton
                _expanded={{ bg: "blue.600", color: "white", borderRadius: 5 }}
              >
                <Box flex="1" textAlign="left">
                  องค์ประกอบ 2
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>-</AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Button colorScheme="blue" margin={5}>
          เพิ่มองค์ประกอบ
        </Button>
      </Box>
    </Flex>
  );
};

export default ViewSemesterForm;
