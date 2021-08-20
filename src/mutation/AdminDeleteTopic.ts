import { gql } from "@apollo/client";

const ADMIN_DELETE_TOPIC = gql`
  mutation AdminDeleteTopicMutation($adminDeleteTopic: AdminDeleteTopicDto!) {
    AdminDeleteTopic(AdminDeleteTopicDto: $adminDeleteTopic)
  }
`;

export default ADMIN_DELETE_TOPIC;
