import { gql } from "@apollo/client";
const ADMIN_DELETE_SUB_CATEGORY_MUTATION = gql`
  mutation AdminDeleteSubCategory($input: DeleteSubCategoryDto!) {
    AdminDeleteSubCategory(DeleteSubCategoryDto: $input)
  }
`;

export default ADMIN_DELETE_SUB_CATEGORY_MUTATION;
