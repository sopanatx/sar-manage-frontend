import { gql } from "apollo-boost";
const getSemester = gql`
  query {
    getSemester {
      id
      semesterName
    }
  }
`;
export default getSemester;
