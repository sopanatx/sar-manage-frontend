import { Box, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const SomeImage = () => {
  return (
    <>
      <Box marginY={8} maxWidth={400} marginX="auto">
        <Image src="/public/Launching-amico.svg" width={400} height={400} />
      </Box>
      <Text textAlign="center" fontSize="xs">
        <Link href="https://stories.freepik.com/web" isExternal>
          Test
        </Link>
      </Text>
    </>
  );
};

export default SomeImage;
