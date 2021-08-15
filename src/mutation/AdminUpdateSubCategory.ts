import { gql } from "@apollo/client";

const ADMIN_UPDATE_SUBCATEGORY_MUTATION = gql`
  mutation AdminUpdateSubCategoryMutation(
    $adminUpdateSubCategory: AdminUpdateSubCategoryDto!
  ) {
    AdminUpdateSubCategory(UpdateSubCategoryDto: $adminUpdateSubCategory)
  }
`;
export default ADMIN_UPDATE_SUBCATEGORY_MUTATION;
