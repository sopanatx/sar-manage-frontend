import { Box, extendTheme, Heading, useColorMode } from "@chakra-ui/react";

import HelperImage from "./HelperImage";

const SomeText = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Box
        backgroundColor={colorMode === "light" ? "gray.300" : "gray.600"}
        padding={4}
        borderRadius={4}
      >
        <Box d="flex" alignItems="center" fontSize="sm">
          Secured Document Sharing For Organization
        </Box>
      </Box>
    </>
  );
};

export default SomeText;
