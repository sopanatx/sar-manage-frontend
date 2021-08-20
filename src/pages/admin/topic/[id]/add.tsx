import { Box } from "@chakra-ui/react";

import LoginForm from "../../../../components/LoginForm";
import Footer from "../../../../components/layout/Footer";
import Header from "../../../../components/layout/Header";
import AddSubTopicForm from "../../../../components/AdminForm/AddSubTopicForm";
import { useRouter } from "next/router";
const VARIANT_COLOR = "blue";

const AddSemester = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Box bg="blue.100">
      <Header />
      <AddSubTopicForm TopicId={id} />
      <Footer />
    </Box>
  );
};

export default AddSemester;
