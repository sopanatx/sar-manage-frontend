import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Footer from "../../../components/layout/Footer";
import Header from "../../../components/layout/Header";
import EditUserForm from "../../../components/AdminForm/EditUserForm";
const VARIANT_COLOR = "blue";

const EditUser = () => {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <Box bg="blue.100">
      <Header />
      <EditUserForm userId={userId} />
      <Footer />
    </Box>
  );
};

export default EditUser;
