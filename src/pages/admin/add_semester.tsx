import { Box } from "@chakra-ui/react";

import LoginForm from "../../components/LoginForm";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import AddSemesterForm from "../../components/AdminForm/AddSemesterForm";
const VARIANT_COLOR = "blue";

const AddSemester = () => {
  return (
    <Box bg="blue.100">
      <Header />
      <AddSemesterForm />
      <Footer />
    </Box>
  );
};

export default AddSemester;
