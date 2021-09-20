// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;
import "./Campaign.sol";

contract CampaignCreator {
    Campaign[] public campaigns;

    function createCampaign(
        string memory title,
        string memory description,
        uint256 minimum
    ) public returns (Campaign) {
        Campaign newCampaign = new Campaign(
            title,
            description,
            minimum,
            msg.sender
        );
        campaigns.push(newCampaign);
        return newCampaign;
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }
}
