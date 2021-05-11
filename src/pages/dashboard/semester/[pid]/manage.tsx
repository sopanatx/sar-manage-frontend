import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { useState, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
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
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Link,
  Grid,
  GridItem,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Header from "../../../../components/layout/Header";
import GET_CATEGORY from "../../../../queries/getCategories";
import { gql } from "@apollo/client";
import GET_TOPIC_DOCUMENT from "../../../../queries/getTopicDocument";
import GET_SERVICE_STATUS from "../../../../queries/getServiceStatus";
const ManageDocument = () => {
  const router = useRouter();
  const { pid } = router.query;
  const variableRef = useRef({});

  const { data, error, loading } = useQuery(GET_CATEGORY);
  const [shouldExecute, executeQuery] = useState(false);
  const [stateSubCategory, setStateSubCategory] = useState();
  const [loadTopic, res1] = useLazyQuery(GET_TOPIC_DOCUMENT, {
    fetchPolicy: "network-only",
  });
  const handleClick = (SubCategory: string) => {
    loadTopic({
      variables: {
        getTopicBySubCategoriesGetTopicBySubCategories: {
          subCategoryId: SubCategory,
        },
      },
    });
    setIsSelectedTopic(true);
    console.log(res1);
  };

  const [isSelectedTopic, setIsSelectedTopic] = useState(false);

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
            height="xl"
            maxWidth="1500px"
            maxHeight="1500px"
            borderRadius={8}
            textAlign="center"
            bg="white"
          >
            <Heading color="gray.600">
              เลือกหัวข้อที่ต้องการเพิ่ม / แก้ไข
            </Heading>
            {!loading && !error && data ? (
              <>
                <SimpleGrid columns={2} spacing={10}>
                  <Accordion px={5} py={5}>
                    {data.getCategories.map((item: any, index: number) => (
                      <>
                        <AccordionItem>
                          <h2>
                            <AccordionButton
                              _expanded={{
                                bg: "blue.800",
                                color: "white",
                                borderRadius: 5,
                              }}
                            >
                              <Box flex="1" textAlign="left">
                                <Text fontFamily="Kanit" fontSize={18}>
                                  {item.categoryName}
                                </Text>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          {item.SubCategory.map((item: any, index: number) => (
                            <AccordionPanel pb={4}>
                              <Link
                                color="blue.500"
                                as="span"
                                onClick={() => handleClick(item.id)}
                              >
                                {item.subCategoryName}
                              </Link>
                            </AccordionPanel>
                          ))}
                        </AccordionItem>
                      </>
                    ))}
                  </Accordion>
                  <Box
                    marginTop={3}
                    px={3}
                    py={3}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    {isSelectedTopic ? (
                      <>
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          py={5}
                          color="red.500"
                        >
                          กรุณาเลือกตัวบ่งชี้
                        </Text>
                        {res1.data && !res1.loading ? (
                          <>
                            <Select>
                              {res1.data.getTopicBySubCategories.map(
                                (item: any, index: number) => (
                                  <option>
                                    {index}. {item.topicName}
                                  </option>
                                )
                              )}
                            </Select>
                          </>
                        ) : null}
                      </>
                    ) : (
                      <Text>โปรดเลือกหัวข้อที่ต้องการจัดการเอกสาร</Text>
                    )}
                  </Box>
                </SimpleGrid>
              </>
            ) : (
              <>
                <Text margin={20}>กำลังโหลดข้อมูล</Text>
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default ManageDocument;
