import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Link,
  Flex,
  Text,
} from "@chakra-ui/react";

import SomeText from "../components/SomeText";
import SomeImage from "../components/SomeImage";
import CTASection from "../components/CTASection";
import LoginForm from "../components/LoginForm";
import Footer from "../components/layout/Footer";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
const VARIANT_COLOR = "blue";

const ForgotPassword = () => {
  return (
    <>
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPassword;
