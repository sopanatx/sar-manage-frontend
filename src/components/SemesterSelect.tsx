import {
  Box,
  Stack,
  Button,
  Flex,
  Text,
  Select,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import router from "next/router";
import { useState } from "react";
import { useQuery } from "react-apollo";
import GET_SEMESTER from "../queries/getSemester";
const VARIANT_COLOR = "blue";
function handleChange(event) {
  console.log(event.targer.value);
}

const SemesterSelect = () => {
  const { data, error, loading } = useQuery(GET_SEMESTER);
  const [semester, setSemester] = useState("");

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

            <Alert status="info" variant="subtle" margin={2} borderRadius={9}>
              <AlertIcon />
              ระบบจะนำทางไปยังหน้าจัดการเอกสารเมื่อท่านได้เลือกปีการศึกษาแล้ว
            </Alert>

            {!loading && !error && data ? (
              <>
                <Select
                  size="md"
                  my="8px"
                  mx="8px"
                  isRequired={true}
                  onChange={(e) =>
                    router.push(`/dashboard/semester/${e.target.value}`)
                  }
                  placeholder="เลือกปีการศึกษา"
                  variant="filled"
                >
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
          {/* <Button
            colorScheme="blue"
            onClick={() => router.push(`dashboard/semester/${semester}`)}
          >
            ยืนยัน
          </Button> */}
        </Box>
      </Flex>
    </Box>
  );
};

export default SemesterSelect;
