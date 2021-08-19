import { gql } from "@apollo/client";
const MY_ACCOUNT_INFO = gql`
  query {
    MyAccountInfo {
      id
      fullname
      username
      email
      createdAt
      updatedAt
    }
  }
`;

export default MY_ACCOUNT_INFO;
