import { gql } from "@apollo/client";
const GET_TOPIC_BY_SUBCATEGORIES = gql`
  query GetTopicBySubCategories(
    $getTopicBySubCategories: GetTopicBySubCategories!
  ) {
    getTopicBySubCategories(getTopicBySubCategories: $getTopicBySubCategories) {
      id
      topicName
      topicDetails
    }
  }
`;

export default GET_TOPIC_BY_SUBCATEGORIES;
