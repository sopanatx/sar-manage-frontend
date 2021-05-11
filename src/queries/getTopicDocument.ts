import { gql } from "@apollo/client";

const GET_TOPIC_DOCUMENT = gql`
  query Query(
    $getTopicBySubCategoriesGetTopicBySubCategories: GetTopicBySubCategories!
  ) {
    getTopicBySubCategories(
      getTopicBySubCategories: $getTopicBySubCategoriesGetTopicBySubCategories
    ) {
      topicName
      topicDetails
      createdAt
      updatedAt
    }
  }
`;
export default GET_TOPIC_DOCUMENT;
