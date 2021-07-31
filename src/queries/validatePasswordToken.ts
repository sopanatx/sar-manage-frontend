import { gql } from "@apollo/client";
const VALIDATE_PASSWORD_TOKEN = gql`
  query Query($validatePasswordResetToken: ValidateTokenDto!) {
    validatePasswordResetToken(
      ValidatePasswordToken: $validatePasswordResetToken
    )
  }
`;

export default VALIDATE_PASSWORD_TOKEN;
