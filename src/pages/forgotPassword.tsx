import { Box } from "@chakra-ui/react";

import Footer from "../components/layout/Footer";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
const VARIANT_COLOR = "blue";

const ForgotPassword = () => {
  return (
    <Box bg="blue.100">
      <ForgotPasswordForm />
      <Footer />
    </Box>
  );
};

export default ForgotPassword;
