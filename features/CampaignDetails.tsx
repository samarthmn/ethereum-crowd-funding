import { Grid, GridItem, Text, Link, Flex } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import web3 from "web3";
import Card from "../components/Card";
import { compressedAddress } from "../utils/string-utils";

type Props = {
  campaign: Campaign;
};

const CampaignDetails: React.FC<Props> = ({ campaign }) => {
  return (
    <>
      <Grid>
        <GridItem w="full">
          <Card>
            <Text>{campaign?.title}</Text>
            <Text>{campaign?.description}</Text>
            <Link
              href={`https://rinkeby.etherscan.io/address/${campaign.id}`}
              isExternal
            >
              <Flex gap={2} alignItems="center" as="span" fontSize="sm" mt={4}>
                {compressedAddress(campaign.id)} <FaExternalLinkAlt />
              </Flex>
            </Link>
          </Card>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
        <GridItem w="full">
          <Card>
            <Text fontSize="md">
              Current Balance:{" "}
              {web3.utils.fromWei(campaign?.balanceAmount, "ether")} ETH
            </Text>
          </Card>
        </GridItem>
        <GridItem w="full">
          <Card>
            <Text>
              Minimum Contribution Amount: {campaign?.minimumContribution} WEI
            </Text>
            <Text fontSize="xs">
              100 WEI = {web3.utils.fromWei("100", "ether")} ETH
            </Text>
          </Card>
        </GridItem>
        <GridItem w="full">
          <Card>
            <Text>
              Total Contributed:{" "}
              {web3.utils.fromWei(campaign?.totalContribution, "ether")} ETH
            </Text>
          </Card>
        </GridItem>
        <GridItem w="full">
          <Card>
            <Text>Total Backers: {campaign?.contributorsCount}</Text>
          </Card>
        </GridItem>
        <GridItem w="full">
          <Card>
            <Text>
              Total Spending Requests: {campaign?.spendingRequestCount}
            </Text>
          </Card>
        </GridItem>
      </Grid>
    </>
  );
};

export default CampaignDetails;
