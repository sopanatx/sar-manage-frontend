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
import GET_SEMESTER from "../queries/getSemester";
const VARIANT_COLOR = "blue";
const SemesterSelect = () => {
  const { data, error, loading } = useQuery(GET_SEMESTER);
  return (
    <Box bg="blue.100">
      <Flex
        minHeight="100vh"
        width="full"
        align="center"
        justifyContent="center"
      >
        <Box
          px={5}
          py={10}
          width="full"
          maxWidth="600px"
          borderRadius={4}
          textAlign="center"
          // boxShadow="lg"
          bg="white"
        >
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              โปรดเลือกปีการศึกษา
            </Text>

            {!loading && !error && data ? (
              <>
                <Select size="md" my="8px" mx="8px">
                  {data.getSemester.map((item: any, index: any) => (
                    <option value={item.id}>{item.semesterName}</option>
                  ))}
                </Select>
              </>
            ) : (
              <>
                <Stack align="center" py={8}>
                  <Spinner color="blue.500" />
                </Stack>
              </>
            )}
          </Box>
          <Button colorScheme="blue">ยืนยัน</Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default SemesterSelect;
