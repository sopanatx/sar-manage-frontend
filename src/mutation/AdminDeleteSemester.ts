import { gql } from "@apollo/client";
const ADMIN_DELETE_SEMESTER_MUTATION = gql`
  mutation AdminDeleteSemester($input: DeleteSemesterDto!) {
    AdminDeleteSemester(AdminDeleteSemesterDto: $input)
  }
`;

export default ADMIN_DELETE_SEMESTER_MUTATION;
