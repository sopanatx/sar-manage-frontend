import { Box, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const SomeImage = () => {
  return (
    <>
      <Box marginY={8} maxWidth={400} marginX="auto">
        <Image src="/2808347.svg" width={400} height={400} />
      </Box>
    </>
  );
};

export default SomeImage;
