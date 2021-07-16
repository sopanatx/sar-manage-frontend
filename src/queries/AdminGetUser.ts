import { gql } from "@apollo/client";

const ADMIN_GET_USER = gql`
  query ($input: AdminGetUserDto!) {
    AdminGetUser(AdminGetUserDto: $input) {
      id
      fullname
      username
      fullname
      email
      userLevel
    }
  }
`;

export default ADMIN_GET_USER;
