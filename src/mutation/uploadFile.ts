import { gql } from "@apollo/client";
const UPLOAD_FILE = gql`
  mutation ($file: Upload!, $uploadFileDocumentDetails: UploadDocumentDto!) {
    uploadFile(file: $file, DocumentDetails: $uploadFileDocumentDetails)
  }
`;

export default UPLOAD_FILE;
