import { Box } from "@chakra-ui/react";

import Footer from "../../../components/layout/Footer";
import Header from "../../../components/layout/Header";
import ListUsersForm from "../../../components/AdminForm/ListUsersForm";
import AddTopicForm from "../../../components/AdminForm/AddTopicForm";
const VARIANT_COLOR = "blue";

const Topic = () => {
  return (
    <Box bg="blue.100">
      <Header />
      <AddTopicForm />
      <Footer />
    </Box>
  );
};

export default Topic;
