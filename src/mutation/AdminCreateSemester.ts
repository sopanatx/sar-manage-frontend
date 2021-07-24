import { gql } from "@apollo/client";
const ADMIN_CREATE_SEMESTER_MUTATION = gql`
  mutation AdminCreateSemesterMutation(
    $adminCreateSemester: AdminCreateSemesterDto!
  ) {
    AdminCreateSemester(AdminCreateSemesterDto: $adminCreateSemester)
  }
`;
export default ADMIN_CREATE_SEMESTER_MUTATION;
