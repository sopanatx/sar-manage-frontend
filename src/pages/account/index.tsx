import { Box, Text } from "@chakra-ui/react";
import Header from "../../components/layout/Header";
import AccountInfoForm from "../../components/UserForm/AccountInfoForm";
const VARIANT_COLOR = "blue";

const AccountInfo = () => {
  return (
    <Box bg="blue.100">
      <Header />
      <AccountInfoForm />
    </Box>
  );
};

export default AccountInfo;
