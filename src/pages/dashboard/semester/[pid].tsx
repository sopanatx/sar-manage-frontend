import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import Header from "../../../components/layout/Header";
import ViewSemesterForm from "../../../components/form/ViewSemesterForm";
import ListCategories from "../../../components/form/ListCategory";
import { useState, useEffect } from "react";
const viewSemesterStatus = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <Box bg="blue.100">
      {" "}
      <Header />
      <ViewSemesterForm semester={pid} />
    </Box>
  );
};

export default viewSemesterStatus;
