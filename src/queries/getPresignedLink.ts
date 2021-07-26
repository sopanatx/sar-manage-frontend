import { gql } from "@apollo/client";
const GET_PRESIGNED_LINK = gql`
  query GetPresignedLink($getPresignedLink: GetPresignedLinkDto!) {
    getPresignedLink(GetPresignedLinkDto: $getPresignedLink) {
      presignedUrl
    }
  }
`;

export default GET_PRESIGNED_LINK;
