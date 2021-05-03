import { gql } from "@apollo/client";
const getCategories = gql`
  query {
    getCategories {
      id
      categoryName
      SubCategory {
        id
        subCategoryName
        subCategoryDescription
        isAvailable
        createdAt
        updatedAt
      }
    }
  }
`;

export default getCategories;
