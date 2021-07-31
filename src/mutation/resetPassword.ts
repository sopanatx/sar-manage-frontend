import { gql } from "@apollo/client";
const RESET_PASSWORD = gql`
  mutation ResetPasswordMutation($resetPassword: ResetPasswordDto!) {
    ResetPassword(ResetPasswordDto: $resetPassword)
  }
`;

export default RESET_PASSWORD;
