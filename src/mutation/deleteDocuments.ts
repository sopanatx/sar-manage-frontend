import { gql } from "@apollo/client";
const DELETE_DOCUMENTS_MUTATION = gql`
  mutation DeleteDocumentMutation($deleteDocument: DeleteDocumentDto!) {
    deleteDocument(DeleteDocumentDto: $deleteDocument)
  }
`;
export default DELETE_DOCUMENTS_MUTATION;
