import {
  Box,
  Stack,
  Button,
  Flex,
  Text,
  Select,
  Spinner,
  Alert,
  AlertIcon,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import router from "next/router";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import MY_ACCOUNT_INFO from "../../queries/myaccountinfo";
const VARIANT_COLOR = "blue";

const AccountInfoForm = () => {
  const { data, loading, error } = useQuery(MY_ACCOUNT_INFO, {
    fetchPolicy: "network-only",
  });
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
          maxWidth="600px"
          borderRadius={4}
          // textAlign="center"
          boxShadow="md"
          bg="white"
        >
          <Text fontFamily="Kanit" fontSize={24} fontWeight="bold">
            ข้อมูลบัญชี
          </Text>
          <Alert status="info" variant="top-accent" borderRadius={6}>
            <AlertIcon />
            ท่านสามารถปรับปรุงข้อมูลบัญชีได้ทันที
            โดยทำการเปลี่ยนข้อมูลตามต้องการ หลังจากนั้นให้ทำการกดบันทีก
          </Alert>
          {!loading && !error && data ? (
            <>
              <FormControl id="fullname" py={5}>
                <FormLabel>ชื่อ-สกุล</FormLabel>
                <Input type="fullname" value={data.MyAccountInfo.fullname} />
                <FormHelperText>
                  ชื่อ-นามสกุลจริง ภาษาไทย หรือ อังกฤษ อักขระ.
                </FormHelperText>
              </FormControl>

              <FormControl id="email">
                <FormLabel>อีเมล</FormLabel>
                <Input type="email" value={data.MyAccountInfo.email} />
                <FormHelperText>
                  ใช้งานอีเมลที่เข้าถึงได้ สำหรับกรณีกู้คืนรหัสผ่านบัญชี
                  หรือการแจ้งเตือนอื่นๆ
                </FormHelperText>
              </FormControl>

              <FormControl id="username" py={2}>
                <FormLabel>ชื่อผู้ใช้</FormLabel>
                <Input type="username" value={data.MyAccountInfo.username} />
                <FormHelperText>
                  ชื่อผู้ใช้สำหรับใช้งานในการเข้าสู่ระบบ
                </FormHelperText>
              </FormControl>
            </>
          ) : null}
        </Box>
      </Flex>
    </Box>
  );
};

export default AccountInfoForm;
