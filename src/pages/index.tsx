import { Box } from "@chakra-ui/react";

import LoginForm from "../components/LoginForm";
import Footer from "../components/layout/Footer";

const VARIANT_COLOR = "blue";

const Home = () => {
  return (
    <Box bg="blue.100">
      <LoginForm />
      <Footer />
    </Box>
  );
};

export default Home;
