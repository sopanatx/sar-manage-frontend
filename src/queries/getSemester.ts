import { gql } from "apollo-boost";
const getSemester = gql`
  query {
    getSemester {
      id
      semesterName
      isAvaliable
      createdAt
    }
  }
`;
export default getSemester;
