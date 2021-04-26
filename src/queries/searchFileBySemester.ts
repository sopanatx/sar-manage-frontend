import { gql } from "@apollo/client";
const searchFileBySemester = gql`
  query($input: SearchSemesterFile!) {
    searchFileBySemester(searchSemesterFile: $input) {
      id
      categoryName
      FileUploadData {
        index
      }
    }
    getServiceStatus {
      status
    }
  }
`;

export interface InputData {
  semester: string;
}

export interface CategoryOutput {
  id: number;
  categoryName: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  FileUploadData: FileUploadData[];
}

export interface FileUploadData {
  index: string;
}

export default searchFileBySemester;
