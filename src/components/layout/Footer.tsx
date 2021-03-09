import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" width="full" align="center" marginY={200}>
      <Text>
        © 2021 All Right Reserved By{" "}
        <Link href="https://pleum.in.th" isExternal>
          Pleum Studio Software Development.
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
