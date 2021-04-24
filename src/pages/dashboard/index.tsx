import { Box, useToast } from "@chakra-ui/react";
import { useQuery } from "react-apollo";
import GET_SEMESTER from "../../queries/getSemester";
import Header from "../../components/layout/Header";
import SemesterSelect from "../../components/SemesterSelect";
import router from "next/router";

const VARIANT_COLOR = "blue";

//const componetsState = <Header />;

const Dashboard = () => {
  if (typeof window != "undefined") {
    if (!localStorage.getItem("accessToken")) {
      router.push("/");
    }
  }
  const toast = useToast();
  const { data, error, loading } = useQuery(GET_SEMESTER);
  if (error && !loading) {
    toast({
      title: `ไม่สามารถรับข้อมูลจากเซิร์ฟเวอร์ได้`,
      status: "error",
      description: `สาเหตุ: ${error.message.replace("GraphQL error:", "")}`,
      isClosable: true,
      position: "top-right",
      duration: 5000,
    });
  }
  return (
    <Box bg="blue.100">
      <Header />
      <SemesterSelect />
    </Box>
  );
};

export default Dashboard;
