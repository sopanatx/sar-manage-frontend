import { Box } from "@chakra-ui/react";

import Footer from "../../../components/layout/Footer";
import Header from "../../../components/layout/Header";
import ListUsersForm from "../../../components/AdminForm/ListUsersForm";
const VARIANT_COLOR = "blue";

const ListUser = () => {
  return (
    <Box bg="blue.100">
      <Header />
      <ListUsersForm />
      <Footer />
    </Box>
  );
};

export default ListUser;
