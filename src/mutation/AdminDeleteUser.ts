import { gql } from "@apollo/client";

const DELETE_USER_MUTATION = gql`
  mutation AdminDeleteUserMutation($adminDeleteUser: AdminDeleteUserDto!) {
    AdminDeleteUser(AdminDeleteUserDto: $adminDeleteUser)
  }
`;
export default DELETE_USER_MUTATION;
