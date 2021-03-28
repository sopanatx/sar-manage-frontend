import { gql } from "apollo-boost";
const signIn = gql`
  mutation($input: LocalAuthDto!) {
    signIn(localAuthDto: $input) {
      accessToken
      refreshToken
    }
  }
`;

export interface Credentials {
  username: string;
  password: string;
}

export interface SignInOutput {
  accessToken: string;
  refreshToken: string;
}

export default signIn;
