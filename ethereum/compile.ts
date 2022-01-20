const util = require("util");
const path = require("path");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
const tempBuildPath = path.resolve(__dirname, "temp");
fs.removeSync(buildPath);
fs.removeSync(tempBuildPath);

async function compile() {
  try {
    fs.ensureDirSync(buildPath);
    fs.ensureDirSync(tempBuildPath);
    const { stderr } = await exec(
      "solc --overwrite --combined-json abi,bin -o ./ethereum/temp ./ethereum/contracts/Campaign.sol && solc --overwrite --combined-json abi,bin -o ./ethereum/temp ./ethereum/contracts/CampaignCreator.sol"
    );
    if (stderr) {
      throw stderr;
    }
    const outputJson = require("./temp/combined.json");
    Object.keys(outputJson.contracts).map((keys) => {
      const fileName = keys.split(":")[1];
      fs.outputJSONSync(
        path.resolve(buildPath, fileName + ".json"),
        JSON.parse(
          JSON.stringify({
            abi: outputJson.contracts[keys].abi,
            bytecode: outputJson.contracts[keys].bin,
          })
        )
      );
    });
    fs.removeSync(tempBuildPath);
  } catch (err) {
    console.error(err);
    fs.removeSync(tempBuildPath);
  }
}
compile();

export {};
