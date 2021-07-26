import { gql } from "@apollo/client";
const GET_FILE_UPLOAD_LIST = gql`
  query Query(
    $getTopicBySubCategories: GetTopicBySubCategories!
    $getFileUploadList: GetFileUploadListDto!
    $getHasTopicList: HasTopicListDto!
  ) {
    getTopicBySubCategories(getTopicBySubCategories: $getTopicBySubCategories) {
      id
      topicName
      topicDetails
    }
    getFileUploadList(GetFileUploadListDto: $getFileUploadList) {
      id
      index
      filename
      title
      fileUrl
    }
    getHasTopicList(getHasTopicList: $getHasTopicList) {
      hasTopicList
      topicCount
    }
  }
`;
export default GET_FILE_UPLOAD_LIST;
