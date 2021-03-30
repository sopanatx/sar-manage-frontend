import {
  Box,
  Stack,
  Button,
  Flex,
  Text,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "react-apollo";
import GET_SEMESTER from "../../queries/getSemester";
import Header from "../../components/layout/Header";
import SemesterSelect from "../../components/SemesterSelect";

const VARIANT_COLOR = "blue";

//const componetsState = <Header />;

const Dashboard = () => {
  const { data, error, loading } = useQuery(GET_SEMESTER);
  return (
    <Box bg="blue.100">
      <Header />
      <SemesterSelect />
    </Box>
  );
};

export default Dashboard;
