import { gql } from "@apollo/client";
const ADMIN_UPDATE_TOPIC = gql`
  mutation AdminUpdateTopicMutation($adminUpdateTopic: AdminUpdateTopicDto!) {
    AdminUpdateTopic(AdminUpdateTopic: $adminUpdateTopic)
  }
`;

export default ADMIN_UPDATE_TOPIC;
