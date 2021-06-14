import { gql } from "@apollo/client";

const GET_TOPIC_DOCUMENT = gql`
  query GetTopicList(
    $getTopicBySubCategoriesGetTopicBySubCategories: GetTopicBySubCategories!
    $getHasTopicListGetHasTopicList: HasTopicListDto!
  ) {
    getTopicBySubCategories(
      getTopicBySubCategories: $getTopicBySubCategoriesGetTopicBySubCategories
    ) {
      topicName
      topicDetails
    }
    getHasTopicList(getHasTopicList: $getHasTopicListGetHasTopicList) {
      hasTopicList
      topicCount
    }
  }
`;
export default GET_TOPIC_DOCUMENT;
