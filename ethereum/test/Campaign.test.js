const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const CampaignBuildJson = require("../build/Campaign.json");
const CampaignCreatorBuildJson = require("../build/CampaignCreator.json");

const web3 = new Web3(ganache.provider());
const gas = "3000000";

let accounts, campaignCreatorContract, campaignContract, campaignAddresses;
const minimumContribution = 100,
  title = "Test Title",
  description = "Test Description";

const errorProcessor = (ethError) => {
  return ethError?.results
    ? Object.values(ethError?.results).map((e) => e.reason)
    : false;
};

beforeEach(async () => {
  try {
    accounts = await web3.eth.getAccounts();
    campaignCreatorContract = await new web3.eth.Contract(
      CampaignCreatorBuildJson.abi
    )
      .deploy({ data: CampaignCreatorBuildJson.bytecode })
      .send({ from: accounts[0], gas });
    await campaignCreatorContract.methods
      .createCampaign(title, description, minimumContribution)
      .send({
        from: accounts[0],
        gas,
      });
    campaignAddresses = await campaignCreatorContract.methods
      .getAllCampaigns()
      .call();
    campaignContract = await new web3.eth.Contract(
      CampaignBuildJson.abi,
      campaignAddresses[0]
    );
  } catch (error) {
    console.error(error);
  }
});

describe("Campaign", () => {
  it("deploys a CampaignCreator and Campaign contracts", () => {
    assert.ok(campaignCreatorContract?.options?.address);
    assert.ok(campaignContract?.options?.address);
  });

  it("checks if the creator address is correct", async () => {
    const creator = await campaignContract.methods.creator().call();
    assert.equal(creator, accounts[0]);
  });

  it("checks if the campaign meta data are correct", async () => {
    const _minimumContribution = await campaignContract.methods
      .minimumContribution()
      .call();
    const _description = await campaignContract.methods.description().call();
    const _title = await campaignContract.methods.title().call();
    assert.equal(_minimumContribution, minimumContribution);
    assert.equal(_description, description);
    assert.equal(_title, title);
  });

  it("allows users to contribute and marks as contributer", async () => {
    assert.equal(await campaignContract.methods.contributorsCount().call(), 0);
    await campaignContract.methods.contribute().send({
      value: "9876",
      from: accounts[1],
      gas,
    });
    assert.equal(await campaignContract.methods.contributorsCount().call(), 1);
    const isContributor = await campaignContract.methods
      .contributors(accounts[1])
      .call();
    assert.equal(isContributor._value, 9876);
    assert(isContributor.hasContributed);
    const totalContribution = await campaignContract.methods
      .totalContribution()
      .call();
    assert.equal(totalContribution, 9876);
  });

  it("allows multiple users to contribute correctly", async () => {
    assert.equal(await campaignContract.methods.contributorsCount().call(), 0);
    await campaignContract.methods.contribute().send({
      value: "200",
      from: accounts[1],
      gas,
    });
    assert.equal(await campaignContract.methods.contributorsCount().call(), 1);
    const isContributor1 = await campaignContract.methods
      .contributors(accounts[1])
      .call();
    assert.equal(isContributor1._value, 200);
    assert(isContributor1.hasContributed);
    const totalContribution1 = await campaignContract.methods
      .totalContribution()
      .call();
    assert.equal(totalContribution1, 200);
    await campaignContract.methods.contribute().send({
      value: "250",
      from: accounts[2],
      gas,
    });
    const isContributor2 = await campaignContract.methods
      .contributors(accounts[2])
      .call();
    assert.equal(isContributor2._value, 250);
    assert(isContributor2.hasContributed);
    assert.equal(await campaignContract.methods.contributorsCount().call(), 2);
    assert(isContributor2.hasContributed);
    const totalContribution2 = await campaignContract.methods
      .totalContribution()
      .call();
    assert.equal(totalContribution2, 450);
  });

  it("allows contributers to contribute again correctly", async () => {
    assert.equal(await campaignContract.methods.contributorsCount().call(), 0);
    await campaignContract.methods.contribute().send({
      value: "200",
      from: accounts[1],
      gas,
    });
    assert.equal(await campaignContract.methods.contributorsCount().call(), 1);
    const isContributor = await campaignContract.methods
      .contributors(accounts[1])
      .call();
    assert.equal(isContributor._value, 200);
    assert(isContributor.hasContributed);
    await campaignContract.methods.contribute().send({
      value: "210",
      from: accounts[1],
      gas,
    });
    assert.equal(await campaignContract.methods.contributorsCount().call(), 1);
    const isContributor2 = await campaignContract.methods
      .contributors(accounts[1])
      .call();
    assert.equal(isContributor2._value, 410);
    assert(isContributor2.hasContributed);
    const totalContribution = await campaignContract.methods
      .totalContribution()
      .call();
    assert.equal(totalContribution, 410);
  });

  it("requires minimum contribution", async () => {
    try {
      await campaignContract.methods.contribute().send({
        value: `${minimumContribution - 1}`,
        from: accounts[1],
        gas,
      });
      assert(false);
    } catch (error) {
      assert.equal(
        errorProcessor(error)[0],
        "Please contribute more than Minimum Contribution"
      );
    }
  });

  it("allows only creator to create spending requests", async () => {
    try {
      await campaignContract.methods
        .createRequest(
          "Request Title",
          "Request Description",
          "1000",
          accounts[2]
        )
        .send({
          from: accounts[1],
          gas,
        });
      assert(false);
    } catch (error) {
      assert.equal(
        errorProcessor(error)[0],
        "You are not authorised for this action."
      );
    }
  });

  it("allows only creator to finalise spending requests", async () => {
    try {
      await campaignContract.methods
        .createRequest(
          "Request Title",
          "Request Description",
          "1000",
          accounts[1]
        )
        .send({
          from: accounts[0],
          gas,
        });
      await campaignContract.methods.finaliseRequest(0).send({
        from: accounts[1],
        gas,
      });
      assert(false);
    } catch (error) {
      assert.equal(
        errorProcessor(error)[0],
        "You are not authorised for this action."
      );
    }
  });

  it("allows creator to add new spending requests and finalise correctly", async () => {
    await campaignContract.methods.contribute().send({
      value: "10001",
      from: accounts[1],
      gas,
    });
    await campaignContract.methods.contribute().send({
      value: "1000",
      from: accounts[2],
      gas,
    });
    await campaignContract.methods.contribute().send({
      value: "1000",
      from: accounts[3],
      gas,
    });
    await campaignContract.methods.contribute().send({
      value: "1000",
      from: accounts[4],
      gas,
    });
    const totalBalance1 = await campaignContract.methods.balanceAmount().call();
    assert.equal(totalBalance1, 13001);
    await campaignContract.methods
      .createRequest(
        "Request Title",
        "Request Description",
        "1000",
        accounts[5]
      )
      .send({
        from: accounts[0],
        gas,
      });
    const req = await campaignContract.methods.spendingRequest(0).call();
    assert.equal(req.title, "Request Title");
    await campaignContract.methods.approveRequest(0).send({
      from: accounts[1],
      gas,
    });
    await campaignContract.methods.approveRequest(0).send({
      from: accounts[2],
      gas,
    });
    await campaignContract.methods.approveRequest(0).send({
      from: accounts[3],
      gas,
    });
    await campaignContract.methods.rejectRequest(0).send({
      from: accounts[4],
      gas,
    });
    const balance1 = await web3.eth.getBalance(accounts[5]);
    await campaignContract.methods.finaliseRequest(0).send({
      from: accounts[0],
      gas,
    });
    const balance2 = await web3.eth.getBalance(accounts[5]);
    assert(balance2 > balance1);
    const totalBalance2 = await campaignContract.methods.balanceAmount().call();
    assert.equal(totalBalance2, 12001);
  });
});
