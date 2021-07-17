import { gql } from "@apollo/client";
const checkSemester = gql`
  mutation ($input: CheckSemesterDto!) {
    checkSemester(checkSemester: $input)
  }
`;

export interface SemesterField {
  semester: string;
}
