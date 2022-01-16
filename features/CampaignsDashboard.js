import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Link,
  Button,
} from "@chakra-ui/react";
import { FaRegEye } from "react-icons/fa";

function campaignDashboard({ campaigns }) {
  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Campaigns List</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {campaigns.map((address) => (
            <Tr key={address}>
              <Td>{address}</Td>
              <Td>
                <Link
                  href={`/campaign/${address}`}
                  _hover={{ textDecoration: "unset" }}
                >
                  <Button leftIcon={<FaRegEye />} size="sm" variant="outline">
                    View
                  </Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

export default campaignDashboard;
