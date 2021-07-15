import { gql } from "@apollo/client";

const ADMIN_GET_ALL_USER = gql`
  query {
    AdminGetAllUser {
      id
      username
      email
      fullname
      userLevel
      createdAt
      updatedAt
    }
  }
`;

export default ADMIN_GET_ALL_USER;
