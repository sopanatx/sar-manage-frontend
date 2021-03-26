import gql from "graphql-tag";
const getServiceStatus = gql`
  query {
    getServiceStatus
  }
`;
export default getServiceStatus;
