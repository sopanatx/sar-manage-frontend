import { gql } from "@apollo/client";

const ADMIN_ADD_SUB_CATEGORY_MUTATION = gql`
  mutation AdminAddSubCategory($input: AddSubCategoryDto!) {
    AdminAddSubCategory(AddSubCategoryDto: $input)
  }
`;
export default ADMIN_ADD_SUB_CATEGORY_MUTATION;
