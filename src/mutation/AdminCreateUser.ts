import { gql } from "@apollo/client";

const ADMIN_CREATE_USER_MUTATION = gql`
  mutation AdminCreateUser($adminCreateUser: AdminCreateUserDto!) {
    AdminCreateUser(AdminCreateUserDto: $adminCreateUser)
  }
`;

export default ADMIN_CREATE_USER_MUTATION;
