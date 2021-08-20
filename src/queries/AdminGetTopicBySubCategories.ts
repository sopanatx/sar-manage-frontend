import { gql } from "@apollo/client";
const ADMIN_GET_TOPIC_BY_SUBCATEGORIES = gql`
  query GetTopicBySubCategories(
    $getTopicBySubCategories: GetTopicBySubCategories!
    $getSubCategoryInfo: GetSubCategoriesInfoDto!
  ) {
    getTopicBySubCategories(getTopicBySubCategories: $getTopicBySubCategories) {
      id
      topicName
      topicDetails
    }
    getSubCategoryInfo(getSubCategoryInfoDto: $getSubCategoryInfo) {
      subCategoryName
    }
  }
`;

export default ADMIN_GET_TOPIC_BY_SUBCATEGORIES;
