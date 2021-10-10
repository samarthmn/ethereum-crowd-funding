import { useWeb3React } from "@web3-react/core";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Link,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FaRegEye } from "react-icons/fa";
import Layout from "./../components/layout";
import campaignCreatorContract from "../ethereum/web3/campaignCreatorContract";
import HtmlHead from "../components/HtmlHead";

function Home({ campaigns }) {
  console.log(campaigns);
  const { active, library } = useWeb3React();
  console.log(active, library);
  return (
    <Layout>
      <HtmlHead />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Campaign Address</Th>
            <Th>View</Th>
          </Tr>
        </Thead>
        <Tbody>
          {campaigns.map((address) => (
            <Tr>
              <Td>{address}</Td>
              <Td>
                <Link href={`/campaign/${address}`}>
                  <Flex alignItems="center">
                    <Text mr={2}>View</Text>
                    <FaRegEye />
                  </Flex>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Layout>
  );
}

Home.getInitialProps = async () => {
  const campaigns = await campaignCreatorContract.methods
    .getAllCampaigns()
    .call();
  return { campaigns };
};

export default Home;
