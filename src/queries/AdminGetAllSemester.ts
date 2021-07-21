import { gql } from "@apollo/client";
const GET_ALL_SEMESTERS_QUERY = gql`
  query GetAllSemester {
    AdminGetAllSemester {
      id
      semesterName
      isAvailable
      createdAt
      updatedAt
    }
  }
`;
export default GET_ALL_SEMESTERS_QUERY;
