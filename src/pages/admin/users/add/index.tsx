import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Footer from "../../../../components/layout/Footer";
import Header from "../../../../components/layout/Header";
import AddUserForm from "../../../../components/AdminForm/AddUserForm";
const EditUser = () => {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <Box bg="blue.100">
      <Header />
      <AddUserForm />
      <Footer />
    </Box>
  );
};

export default EditUser;
