// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Campaign {
    struct SpendingRequest {
        string title;
        string description;
        uint256 value;
        address payable recipient;
        bool isComplete;
        uint256 approvalCount;
        uint256 rejectionCount;
        mapping(address => bool) hasVoted;
    }

    struct Contributor {
        uint256 _value;
        bool hasContributed;
    }

    address public creator;
    string public title;
    string public description;
    uint256 public totalContribution;
    uint256 public balanceAmount;
    uint256 public minimumContribution;
    mapping(address => Contributor) public contributors;
    uint256 public contributorsCount;
    mapping(uint256 => SpendingRequest) public spendingRequest;
    uint256 public spendingRequestCount;

    constructor(
        string memory _title,
        string memory _description,
        uint256 minimum,
        address creatorAddress
    ) {
        creator = creatorAddress;
        minimumContribution = minimum;
        contributorsCount = 0;
        title = _title;
        description = _description;
    }

    modifier isCreator() {
        require(
            msg.sender == creator,
            "You are not authorised for this action."
        );
        _;
    }

    modifier isContributor() {
        require(
            contributors[msg.sender].hasContributed,
            "You are not a contributor"
        );
        _;
    }

    modifier nonCreatorAction() {
        require(
            msg.sender != creator,
            "You are not authorised for this action."
        );
        _;
    }

    function contribute() public payable nonCreatorAction {
        require(
            msg.value >= minimumContribution,
            "Please contribute more than Minimum Contribution"
        );
        if (!contributors[msg.sender].hasContributed) {
            contributors[msg.sender].hasContributed = true;
            contributorsCount++;
        }
        contributors[msg.sender]._value += msg.value;
        totalContribution += msg.value;
        balanceAmount += msg.value;
    }

    function createRequest(
        string memory requestTitle,
        string memory requestDescription,
        uint256 value,
        address payable recipient
    ) public isCreator {
        SpendingRequest storage newRequest = spendingRequest[
            spendingRequestCount++
        ];
        newRequest.title = requestTitle;
        newRequest.description = requestDescription;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.isComplete = false;
        newRequest.approvalCount = 0;
        newRequest.rejectionCount = 0;
    }

    function approveRequest(uint256 requestIndex)
        public
        isContributor
        nonCreatorAction
    {
        SpendingRequest storage request = spendingRequest[requestIndex];
        require(
            !request.hasVoted[msg.sender],
            "You have already voted for this request"
        );
        request.hasVoted[msg.sender] = true;
        request.approvalCount++;
    }

    function rejectRequest(uint256 requestIndex)
        public
        isContributor
        nonCreatorAction
    {
        SpendingRequest storage request = spendingRequest[requestIndex];
        require(
            !request.hasVoted[msg.sender],
            "You have already voted for this request"
        );
        request.hasVoted[msg.sender] = true;
        request.rejectionCount++;
    }

    function finaliseRequest(uint256 requestIndex) public isCreator {
        SpendingRequest storage request = spendingRequest[requestIndex];
        require(!request.isComplete, "This request already finalised");
        uint256 totalVoted = request.approvalCount + request.rejectionCount;
        require(
            totalVoted > (contributorsCount / 2),
            "You need atleast 50% of contributors to vote for finalising the request."
        );
        if (request.approvalCount > (totalVoted / 2)) {
            request.recipient.transfer(request.value);
            balanceAmount = balanceAmount - request.value;
            request.isComplete = true;
        }
    }
}
