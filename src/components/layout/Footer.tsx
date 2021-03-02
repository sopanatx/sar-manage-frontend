import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" width="full" align="center">
      <Text>
        2021 -{" "}
        <Link href="https://pleum.in.th" isExternal>
          Pleum Studio Software Development.
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
