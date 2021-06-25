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
import GET_TOPIC_DOCUMENT from "../../queries/getTopicDocument";
import UPLOAD_FILE from "../../mutation/uploadFile";
const UploadDocumentForm = (props: any) => {
  const { semester, subCategory } = props;
  const toast = useToast();
  const [topic, setTopic] = useState<any | null>(null);
  const [filename, setFilename] = useState<String>("");
  const [fileIndex, setFileIndex] = useState<String>("");
  const [uploadFile, {}] = useMutation(UPLOAD_FILE);
  const [selectedFile, setSelectedFile] = useState<any | null>();
  const [isSelectedTopic, setIsSelectedTopic] = useState<Boolean>(false);
  const onFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  const { data, loading, error } = useQuery(GET_TOPIC_DOCUMENT, {
    variables: {
      getTopicBySubCategoriesGetTopicBySubCategories: {
        subCategoryId: subCategory,
      },
      getHasTopicListGetHasTopicList: {
        subCategoryId: subCategory,
      },
    },
    fetchPolicy: "network-only",
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
          topicId: topic ?? null,
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
        setIsSelectedTopic(false);
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
      {!loading && !error && data ? (
        <>
          <form onSubmit={handleSubmit}>
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
          </form>
        </>
      ) : null}
    </>
  );
};
export default UploadDocumentForm;
