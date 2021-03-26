import { gql } from "apollo-boost";
const getServiceStatus = gql`
  query {
    getServiceStatus {
      status
      serviceName
      isInMaintenance
    }
  }
`;
export default getServiceStatus;
