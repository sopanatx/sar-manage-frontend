import { gql } from "@apollo/client";
const searchFileBySemester = gql`
  query Query(
    $searchFileBySemester: SearchSemesterFile!
    $CheckSemesterDto: CheckSemesterDto!
  ) {
    searchFileBySemester(searchSemesterFile: $searchFileBySemester) {
      id
      categoryName
      isAvailable
      FileUploadData {
        index
        createdAt
      }
    }
    getSemesterById(CheckSemesterDto: $CheckSemesterDto) {
      id
      semesterName
      isAvailable
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
