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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import GET_ALL_SEMESTERS_QUERY from "../../queries/AdminGetAllSemester";
import { useQuery, useMutation } from "@apollo/client";
import { CloseIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";
import ADMIN_DELETE_SEMESTER_MUTATION from "../../mutation/AdminDeleteSemester";
import ADMIN_CREATE_USER_MUTATION from "../../mutation/AdminCreateUser";
import ADMIN_CREATE_SEMESTER_MUTATION from "../../mutation/AdminCreateSemester";
interface isOpenType {
  dialog: boolean;
  id: string;
  name: string;
}

const AddSemesterForm = () => {
  const toast = useToast();
  const { data, error, loading } = useQuery(GET_ALL_SEMESTERS_QUERY);
  const [isOpen, setIsOpen] = useState<isOpenType>({
    dialog: false,
    id: "",
    name: "",
  });
  const onClose = () => setIsOpen({ dialog: false, id: "", name: "" });
  const cancelRef = useRef<any>();
  const [deleteSemester, {}] = useMutation(ADMIN_DELETE_SEMESTER_MUTATION);
  const [addSemester, { loading: addLoading }] = useMutation(
    ADMIN_CREATE_SEMESTER_MUTATION
  );
  const [semesterName, setSemesterName] = useState<String>("");
  const onDelete = (e: any) => {
    e.preventDefault();
    deleteSemester({
      variables: {
        input: {
          semesterId: isOpen.id,
        },
      },
    })
      .then(() => {
        toast({
          title: `สำเร็จ`,
          status: "warning",
          description: `ลบข้อมูลสำเร็จแล้ว`,
          isClosable: true,
          position: "top-right",
          duration: 10000,
        });
        setIsOpen({ dialog: false, id: "", name: "" });
      })
      .catch(() => {
        toast({
          title: `ผิดพลาด`,
          status: "error",
          description: `ลบข้อมูลไม่สำเร็จ`,
          isClosable: true,
          position: "top-right",
          duration: 10000,
        });
        setIsOpen({ dialog: false, id: "", name: "" });
      });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    addSemester({
      variables: { adminCreateSemester: { semester: semesterName } },
    })
      .then(() => {
        toast({
          title: `สำเร็จ`,
          status: "success",
          description: `เพิ่มปีการศึกษาสำเร็จ`,
          isClosable: true,
          position: "top-right",
          duration: 10000,
        });
      })
      .catch(() => {
        toast({
          title: `ผิดพลาด`,
          status: "error",
          description: `เพิ่มปีการศึกษาไม่สำเร็จ โปรดตรวจสอบข้อมูลอีกครั้ง`,
          isClosable: true,
          position: "top-right",
          duration: 10000,
        });
      });
  };
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
            <AlertDialog
              isOpen={isOpen.dialog}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    ยืนยันการลบข้อมูล
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    คุณแน่ใจว่าจะลบข้อมูล{" "}
                    <Text color="red.500">{isOpen.name} ?</Text>
                    การกระทำดังกล่าว จะไม่สามารถกู้คืนได้ ทั้งนี้
                    ไฟล์เอกสารในปีการศึกษาดังกล่าวจะสามารถเข้าถึงได้ตามปกติ
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      ยกเลิก
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={(e) => onDelete(e)}
                      ml={3}
                    >
                      ยืนยันการลบ
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
            {!loading && !error && data ? (
              <>
                {" "}
                <Text fontFamily="Kanit" fontSize={24} fontWeight="bold">
                  เพิ่มปีการศึกษา
                </Text>
                <form onSubmit={(e) => onSubmit(e)}>
                  <FormControl id="fullname" py={5} isRequired>
                    <FormLabel>ชื่อปีการศึกษา</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => setSemesterName(e.target.value)}
                    />
                    <FormHelperText>
                      ตัวเลข หรือ ข้อความ เช่น "ปีการศึกษา 2565"
                    </FormHelperText>
                  </FormControl>
                  <Button type="submit">เพิ่มข้อมูล</Button>
                </form>
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
                    {data.AdminGetAllSemester.map(
                      (data: any, index: number) => (
                        <>
                          <Tr>
                            <Td>{index + 1}</Td>
                            <Td>{data.semesterName}</Td>
                            <Td>
                              <Button
                                leftIcon={<CloseIcon color="red.500" />}
                                onClick={() =>
                                  setIsOpen({
                                    dialog: true,
                                    id: data.id,
                                    name: data.semesterName,
                                  })
                                }
                              >
                                ลบ
                              </Button>
                            </Td>
                          </Tr>
                        </>
                      )
                    )}
                  </Tbody>
                </Table>
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
                    <Text> Loading ..</Text>
                  </>
                )}
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AddSemesterForm;
