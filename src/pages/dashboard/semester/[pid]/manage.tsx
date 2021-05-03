import { useQuery } from "@apollo/react-hooks";
import {
  Box,
  Flex,
  Text,
  Heading,
  Table,
  TableCaption,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Tfoot,
  Button,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Header from "../../../../components/layout/Header";
import GET_CATEGORY from "../../../../queries/getCategories";

const ManageDocument = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { data, error, loading } = useQuery(GET_CATEGORY);
  return (
    <Box bg="blue.100">
      <Header />
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
            height="xl"
            maxWidth="1500px"
            maxHeight="1500px"
            borderRadius={8}
            textAlign="center"
            bg="white"
          >
            <Heading fontFamily="Kanit" color="gray.600">
              หมวดหมู่
            </Heading>
            {!loading && !error && data ? (
              <>
                <Accordion px={5} py={5}>
                  {data.getCategories.map((item: any, index: number) => (
                    <>
                      <AccordionItem>
                        <h2>
                          <AccordionButton
                            _expanded={{
                              bg: "blue.800",
                              color: "white",
                              borderRadius: 5,
                            }}
                          >
                            <Box flex="1" textAlign="left">
                              <Text fontFamily="Kanit" fontSize={18}>
                                {item.categoryName}
                              </Text>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}></AccordionPanel>
                      </AccordionItem>
                    </>
                  ))}
                </Accordion>
              </>
            ) : (
              <></>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default ManageDocument;
