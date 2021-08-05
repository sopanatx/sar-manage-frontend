
import { gql } from "@apollo/client";
const SEARCH_FILE_BY_NAME = gql`
  mutation SearchFileByName($searchDocumentByName: SearchFileByNameDto!) {
    searchDocumentByName(SearchFileByNameDto: $searchDocumentByName) {
      id
      index
      title
      filename
      fileUrl
      SubCategory {
        subCategoryName
      }
      Semester {
        semesterName
      }
    }
  }
`;
export default SEARCH_FILE_BY_NAME;