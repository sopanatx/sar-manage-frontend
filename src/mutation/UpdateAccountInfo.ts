import { gql } from "@apollo/client";
const UPDATE_ACCOUNT_INFO = gql`
  mutation ($input: UpdateAccountDto!) {
    UpdateAccountInfo(UpdateAccount: $input)
  }
`;

export default UPDATE_ACCOUNT_INFO;
