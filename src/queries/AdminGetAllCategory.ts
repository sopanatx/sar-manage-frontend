import { gql } from "@apollo/client";

const ADMIN_GET_ALL_CATEGORY = gql`
  query AdminGetAllCategory {
    AdminGetAllCategory {
      id
      categoryName
      SubCategory {
        id
        subCategoryName
      }
    }
  }
`;
export default ADMIN_GET_ALL_CATEGORY;
