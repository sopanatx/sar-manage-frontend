import { useRouter } from "next/router";
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
  Tag,
  HStack,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import Header from "../../../components/layout/Header";
import ViewSemesterForm from "../../../components/form/ViewSemesterForm";
import { useState, useEffect } from "react";
import GET_CATEGORY_SEMESTER from "../../../queries/searchFileBySemester";
import { useQuery } from "@apollo/client";
const VARIANT_COLOR = "blue";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";

const viewSemesterStatus = () => {
  const router = useRouter();
  const { pid } = router.query;

  const { data, error, loading } = useQuery(GET_CATEGORY_SEMESTER, {
    variables: {
      searchFileBySemester: { semester: pid },
      CheckSemesterDto: { id: pid },
    },
    fetchPolicy: "no-cache",
  });

  return (
    <Box bg="blue.100">
      <Header />
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
            {!loading && !error ? (
              <>
                <Box>
                  <Text fontFamily="kanit" fontSize="1xl">
                    สถานะการอัปโหลดเอกสาร : {data.getSemesterById.semesterName}
                  </Text>

                  <Button
                    margin={10}
                    px={5}
                    onClick={() =>
                      router.push(`/dashboard/semester/${pid}/manage`)
                    }
                    colorSchema="primary"
                  >
                    จัดการหลักฐาน
                  </Button>
                  <Table variant="striped" colorScheme={VARIANT_COLOR}>
                    <Thead>
                      <Tr>
                        <Th>องค์ประกอบ</Th>
                        <Th>หลักฐาน</Th>
                        <Th>แก้ไขล่าสุด</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.searchFileBySemester.map(
                        (item: any, index: any) => (
                          <>
                            <Tr>
                              <Td>{item.categoryName}</Td>
                              <Td>
                                <HStack spacing={3}>
                                  {item.FileUploadData.map(
                                    (item: any, index: any) => (
                                      <Tag colorScheme="green">
                                        {item.index}
                                      </Tag>
                                    )
                                  )}
                                </HStack>
                              </Td>
                              <Td>-</Td>
                            </Tr>
                          </>
                        )
                      )}
                    </Tbody>
                  </Table>
                </Box>
              </>
            ) : (
              <>
                {error ? (
                  <>
                    <CloseIcon
                      color="red.500"
                      align="center"
                      boxSize="7em"
                      py={5}
                    />

                    <Text>{error.message.replace("GraphQL error:", "")}</Text>
                  </>
                ) : (
                  <>
                    <Text fontFamily="kanit" fontSize="1xl">
                      Loading
                    </Text>
                  </>
                )}
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
export default viewSemesterStatus;
// viewSemesterStatus.getServerSideProps = async () => {
//   const { data, error, loading } = useQuery(GET_CATEGORY_SEMESTER, {
//     variables: { input: { semester: "9248f2d7-c714-44a7-baa0-d1bcbcae086b" } },
//   });
//   return {
//     props: { data },
//   };
// };
