import { Container, Stack, Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Container
      maxW="lg"
      marginTop="auto"
      paddingTop="1.5rem"
      paddingBottom="1.5rem"
    >
      <Stack
        flexDirection={["column", "row"]}
        alignItems="center"
        justifyContent="center"
      >
        <Stack isInline fontWeight="500" fontSize="sm">
          <Text color="secondary.link" fontFamily="Kanit">
            &copy; 2021
          </Text>
          <Link
            href="https://pleum.in.th"
            color="secondary.link"
            fontWeight="600"
            fontFamily="Kanit"
          >
            PLEUM STUDIO SOFTWARE DEVELOPMENT
          </Link>
          <Text color="secondary.link" fontFamily="Kanit">
            &mdash; All rights reserved.
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Footer;
