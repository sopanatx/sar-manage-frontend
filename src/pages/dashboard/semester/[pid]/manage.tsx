import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
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
  SimpleGrid,
  Select,
  Spinner,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputLeftElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FiFile } from "react-icons/fi";
import { useRouter } from "next/router";
import Header from "../../../../components/layout/Header";
import GET_CATEGORY from "../../../../queries/getCategories";
import { gql } from "@apollo/client";
import GET_TOPIC_DOCUMENT from "../../../../queries/getTopicDocument";
import GET_SERVICE_STATUS from "../../../../queries/getServiceStatus";
import UPLOAD_FILE from "../../../../mutation/uploadFile";
import UploadDocumentForm from "../../../../components/DocumentForm/UploadDocumentForm";
//import { useMutation } from "graphql-hooks";
const ManageDocument = () => {
  const router = useRouter();
  const { pid } = router.query;
  const variableRef = useRef({});
  const toast = useToast();
  const { data, error, loading } = useQuery(GET_CATEGORY);
  const [stateSubCategory, setStateSubCategory] = useState<any | null>(null);

  const [loadTopic, res1] = useLazyQuery(GET_TOPIC_DOCUMENT, {
    fetchPolicy: "network-only",
  });
  const [uploadFile, {}] = useMutation(UPLOAD_FILE);
  const [topic, setTopic] = useState<any | null>(null);
  const handleClick = (SubCategory: string) => {
    setStateSubCategory(SubCategory);
    loadTopic({
      variables: {
        getTopicBySubCategoriesGetTopicBySubCategories: {
          subCategoryId: SubCategory,
        },
        getHasTopicListGetHasTopicList: {
          subCategoryId: SubCategory,
        },
      },
    });

    setIsSelectedTopic(true);
  };

  const [isSelectedTopic, setIsSelectedTopic] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const onFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <Box bg="blue.100">
      <Header />
      <Box bg="blue.100">
        <Flex
          minHeight="100vh"
          width="full"
          align="center"
          justifyContent="center"
          margin={2}
          marginBottom={2}
        >
          <Box
            px={5}
            py={10}
            // width="full"
            // height="xl"
            maxWidth="1500px"
            maxHeight="1500px"
            borderRadius={8}
            textAlign="center"
            bg="white"
            overflow="auto"
          >
            <Heading color="gray.600">
              เลือกหัวข้อที่ต้องการเพิ่ม / แก้ไข
            </Heading>
            {!loading && !error && data ? (
              <>
                <SimpleGrid columns={2} spacing={15}>
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
                            <AccordionPanel pb={4} key={item.id}>
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
                          กรุณาเลือกหัวข้อ
                        </Text>
                        {res1.data && !res1.loading ? (
                          <>
                            <>
                              <UploadDocumentForm
                                semester={pid}
                                subCategory={stateSubCategory}
                              />
                            </>
                          </>
                        ) : (
                          <>
                            <Spinner
                              thickness="4px"
                              speed="0.65s"
                              emptyColor="gray.200"
                              color="blue.500"
                              size="xl"
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        py={5}
                        color="red.500"
                      >
                        โปรดเลือกหัวข้อที่ต้องการจัดการเอกสาร
                      </Text>
                    )}
                  </Box>
                </SimpleGrid>
              </>
            ) : (
              <>
                <Spinner
                  margin={10}
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
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
