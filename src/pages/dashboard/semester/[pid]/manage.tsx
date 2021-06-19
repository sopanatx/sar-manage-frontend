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
//import { useMutation } from "graphql-hooks";
const ManageDocument = () => {
  const router = useRouter();
  const { pid } = router.query;
  const variableRef = useRef({});
  const toast = useToast();
  const { data, error, loading } = useQuery(GET_CATEGORY);
  const [stateSubCategory, setStateSubCategory] = useState();
  const [filename, setFilename] = useState("");
  const [fileIndex, setFileIndex] = useState("");
  const [loadTopic, res1] = useLazyQuery(GET_TOPIC_DOCUMENT, {
    fetchPolicy: "network-only",
  });
  const [uploadFile, {}] = useMutation(UPLOAD_FILE);

  const handleClick = (SubCategory: string) => {
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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    uploadFile({
      variables: {
        file: selectedFile,

        uploadFileDocumentDetails: {
          title: filename,
          index: fileIndex,
          semesterId: "8f87e12a-61c3-4439-9976-f5e0e6d5f4cb",
          subCategoryId: 1,
          //    topicId: 4,
          //  categoryId: 1,
        },
      },
    })
      .then((result) => {
        toast({
          title: `อัปโหลดไฟล์เอกสารสำเร็จ`,
          status: "success",
          description: `อัปโหลดไฟล์เอกสารสำเร็จ... ระบบกำลังประมวลผลและกำลังสร้างลิงก์เข้าถึง`,
          isClosable: true,
          position: "top-right",
          duration: 5000,
        });
      })
      .catch((e) =>
        toast({
          title: `อัปโหลดไฟล์เอกสารไม่สำเร็จ`,
          status: "error",
          description: `${e}`,
          isClosable: true,
          position: "top-right",
          duration: 5000,
        })
      );
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
                          กรุณาเลือกหัวข้อ
                        </Text>
                        {res1.data && !res1.loading ? (
                          <>
                            {res1.data.getHasTopicList.hasTopicList ? (
                              <>
                                <Select>
                                  {res1.data.getTopicBySubCategories.map(
                                    (item: any, index: number) => (
                                      <option>
                                        {index + 1}. {item.topicName}
                                      </option>
                                    )
                                  )}
                                </Select>
                              </>
                            ) : (
                              <>
                                <Text>อัปโหลดเอกสาร</Text>
                                <form onSubmit={handleSubmit}>
                                  <FormControl id="Filename">
                                    <FormLabel>ชื่อไฟล์</FormLabel>
                                    <Input
                                      type="text"
                                      required
                                      onChange={(e) =>
                                        setFilename(e.target.value)
                                      }
                                    />
                                    <FormHelperText alignSelf="left">
                                      ชื่อไฟล์เอกสารสามารถตั้งตามต้องการได้
                                    </FormHelperText>
                                  </FormControl>
                                  <FormControl>
                                    <FormLabel>ไฟล์เอกสาร</FormLabel>
                                    <InputGroup>
                                      <InputLeftElement
                                        pointerEvents="none"
                                        children={<Icon as={FiFile} />}
                                      />
                                      <Input
                                        type="file"
                                        required
                                        onChange={(e) => onFileChange(e)}
                                      />
                                    </InputGroup>
                                    <FormControl>
                                      <FormLabel>ลำดับ</FormLabel>
                                      <Input
                                        type="text"
                                        required
                                        onChange={(e) =>
                                          setFileIndex(e.target.value)
                                        }
                                      />
                                    </FormControl>
                                  </FormControl>
                                  <Button type="submit">อัปโหลดเอกสาร</Button>
                                </form>
                              </>
                            )}
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
