const Crowdfund = artifacts.require("basic_Crowdfund");

module.exports = function (deployer) {
  deployer.deploy(Crowdfund,200);
};
