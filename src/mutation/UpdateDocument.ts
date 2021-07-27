import { gql } from "@apollo/client";

const UPDATE_DOCUMENT = gql`
  mutation UpdateDocument($updateDocument: UpdateDocumentDto!) {
    UpdateDocument(UpdateDocumentDto: $updateDocument)
  }
`;
export default UPDATE_DOCUMENT;
