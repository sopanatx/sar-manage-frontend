import { gql } from "apollo-boost";
const checkSemester = gql`
  mutation ($input: CheckSemesterDto!) {
    checkSemester(checkSemester: $input)
  }
`;

export interface SemesterField {
  semester: string;
}
