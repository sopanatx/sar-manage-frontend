import { gql } from "@apollo/client";

const GET_SEMESTER_BY_ID = gql`
  query ($input: CheckSemesterDto!) {
    getSemesterById(CheckSemesterDto: $input) {
      id
      semesterName
    }
  }
`;

export default GET_SEMESTER_BY_ID;
