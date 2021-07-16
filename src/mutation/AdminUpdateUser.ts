import { gql } from "@apollo/client";

const ADMIN_UPDATE_USER = gql`
  mutation ($input: AdminUpdateUserDto!) {
    AdminUpdateUser(AdminUpdateUser: $input) {
      id
      fullname
      userLevel
      username
      email
    }
  }
`;

export default ADMIN_UPDATE_USER;
