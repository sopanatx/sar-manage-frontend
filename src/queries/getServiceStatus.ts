import gql from "graphql-tag";
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
