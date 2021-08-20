import { gql } from "@apollo/client";
const ADMIN_ADD_TOPIC = gql`
  mutation AdminAddTopicMutation($adminAddTopic: AddTopicDto!) {
    AdminAddTopic(addTopicDto: $adminAddTopic)
  }
`;

export default ADMIN_ADD_TOPIC;
