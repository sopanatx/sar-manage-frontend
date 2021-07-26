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
  Stack,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  DownloadIcon,
  LinkIcon,
  EditIcon,
  DeleteIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { FiFile } from "react-icons/fi";
import GET_TOPIC_DOCUMENT from "../../queries/getTopicDocument";
import UPLOAD_FILE from "../../mutation/uploadFile";
import GET_FILE_UPLOAD_LIST from "../../queries/getFileUploadList";
import GET_PRESIGNED_LINK from "../../queries/getPresignedLink";
const UploadDocumentForm = (props: any) => {
  const { semester, subCategory } = props;
  const toast = useToast();
  const [topic, setTopic] = useState<any | null>(null);
  const [filename, setFilename] = useState<String>("");
  const [fileIndex, setFileIndex] = useState<String>("");
  const [uploadFile, {}] = useMutation(UPLOAD_FILE);
  const [selectedFile, setSelectedFile] = useState<any | null>();
  const [isSelectedTopic, setIsSelectedTopic] = useState<Boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>();

  const onFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  const { loading, error, data, refetch } = useQuery(GET_FILE_UPLOAD_LIST, {
    variables: {
      getTopicBySubCategories: {
        subCategoryId: subCategory,
      },
      getFileUploadList: {
        subCategoryId: subCategory,
        semesterId: semester,
      },
      getHasTopicList: {
        subCategoryId: subCategory,
      },
    },
    fetchPolicy: "no-cache",
  });
  const [getLink, { loading: linkLoading, error: linkError, data: linkData }] =
    useLazyQuery(GET_PRESIGNED_LINK, {
      fetchPolicy: "no-cache",
    });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    uploadFile({
      variables: {
        file: selectedFile,
        uploadFileDocumentDetails: {
          title: filename,
          index: fileIndex,
          semesterId: semester,
          subCategoryId: subCategory,
          topicId: +topic,
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
        refetch();
        setIsSelectedTopic(false);
        onClose();
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
    <>
      <Text fontWeight="bold" fontSize="20px" color="black.200">
        {" "}
        รายการไฟล์{" "}
      </Text>

      {!loading && !error && data ? (
        <>
          <Table
            variant="striped"
            colorScheme="blue"
            fontFamily="Kanit"
            fontWeight="light"
          >
            <TableCaption>
              *ไฟล์ที่ถูกลบแล้ว จะถูกลบออกจากระบบอย่างถาวร ไม่สามารถกู้คืนได้*
            </TableCaption>
            <Thead>
              <Tr>
                <Th>ลำดับ</Th>
                <Th>ชื่อไฟล์เอกสาร</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.getFileUploadList.map((item: any, index: number) => (
                <Tr>
                  <Td>{item.index}</Td>
                  <Td>{item.title}</Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        ตัวเลือก
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          onClick={(e) => window.open(item.fileUrl, "_blank")}
                        >
                          <DownloadIcon />
                          <Text px={2}>ดาวน์โหลดไฟล์เอกสาร</Text>
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            navigator.clipboard.writeText(item.fileUrl)
                          }
                        >
                          <LinkIcon />
                          <Text px={2}> คัดลอกลิงก์</Text>
                        </MenuItem>
                        <MenuItem isDisabled={true}>
                          <EditIcon />
                          <Text px={2}> แก้ไข</Text>
                        </MenuItem>
                        <MenuItem isDisabled={true}>
                          {" "}
                          <DeleteIcon color="red.400" />
                          <Text px={2} color="red.400">
                            {" "}
                            ลบ
                          </Text>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>ลำดับ</Th>
                <Th>ชื่อไฟล์เอกสาร</Th>
                <Th>Action</Th>
              </Tr>
            </Tfoot>
          </Table>
          {/* <form onSubmit={handleSubmit}>
            {data.getHasTopicList.hasTopicList ? (
              <>
                <FormControl id="topic" py={2}>
                  <FormLabel>หัวข้อ : </FormLabel>
                  <Select onChange={(e) => setTopic(e.target.value)} required>
                    <option>กรุณาเลือกหัวข้อ</option>
                    {data.getTopicBySubCategories.map(
                      (item: any, index: number) => (
                        <option value={item.id} key={item.id}>
                          {index + 1}. {item.topicName}
                        </option>
                      )
                    )}
                  </Select>
                </FormControl>
              </>
            ) : (
              <></>
            )}
            <FormControl>
              <FormLabel>ลำดับ : </FormLabel>
              <Input
                type="text"
                required
                onChange={(e) => setFileIndex(e.target.value)}
              />
            </FormControl>
            <FormControl id="Filename" py={2}>
              <FormLabel>ชื่อไฟล์ : </FormLabel>
              <Input
                type="text"
                required
                onChange={(e) => setFilename(e.target.value)}
              />
              <FormHelperText alignSelf="left">
                ชื่อไฟล์เอกสารสามารถตั้งตามต้องการได้
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>ไฟล์เอกสาร : </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={FiFile} />}
                />
                <Input type="file" required onChange={(e) => onFileChange(e)} />
              </InputGroup>
            </FormControl>
            <Button type="submit">อัปโหลดเอกสาร</Button>
          </form> */}
          <>
            <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
              Open
            </Button>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">
                  Create a new account
                </DrawerHeader>
                <DrawerBody>
                  <Stack spacing={24}>
                    <form onSubmit={handleSubmit}>
                      {data.getHasTopicList.hasTopicList ? (
                        <>
                          <FormControl id="topic" py={2}>
                            <FormLabel>หัวข้อ : </FormLabel>
                            <Select
                              onChange={(e) => setTopic(e.target.value)}
                              required
                            >
                              <option>กรุณาเลือกหัวข้อ</option>
                              {data.getTopicBySubCategories.map(
                                (item: any, index: number) => (
                                  <option value={item.id} key={item.id}>
                                    {index + 1}. {item.topicName}
                                  </option>
                                )
                              )}
                            </Select>
                          </FormControl>
                        </>
                      ) : (
                        <></>
                      )}
                      <FormControl>
                        <FormLabel>ลำดับ : </FormLabel>
                        <Input
                          type="text"
                          required
                          onChange={(e) => setFileIndex(e.target.value)}
                        />
                      </FormControl>
                      <FormControl id="Filename" py={2}>
                        <FormLabel>ชื่อไฟล์ : </FormLabel>
                        <Input
                          type="text"
                          required
                          onChange={(e) => setFilename(e.target.value)}
                        />
                        <FormHelperText alignSelf="left">
                          ชื่อไฟล์เอกสารสามารถตั้งตามต้องการได้
                        </FormHelperText>
                      </FormControl>
                      <FormControl>
                        <FormLabel>ไฟล์เอกสาร : </FormLabel>
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
                      </FormControl>
                      <Button type="submit">อัปโหลดเอกสาร</Button>
                    </form>
                  </Stack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        </>
      ) : (
        <>
          <>
            {loading && !data ? (
              <>
                {" "}
                <Stack alignItems="center">
                  {" "}
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />{" "}
                </Stack>
              </>
            ) : null}
          </>
        </>
      )}
    </>
  );
};
export default UploadDocumentForm;
