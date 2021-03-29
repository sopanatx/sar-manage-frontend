import { gql } from "apollo-boost";
const signIn = gql`
  mutation($input: PasswordResetDto!) {
    requestPasswordReset(PasswordResetDto: $input) {
      status
      statusMessage
    }
  }
`;

export interface Credentials {
  username: string;
}

export interface PasswordResetOutput {
  status: string;
  statusMessage: string;
}

export default signIn;
