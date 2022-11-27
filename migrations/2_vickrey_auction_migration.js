const VickreyAuction = artifacts.require("VickreyAuction");

module.exports = function (deployer) {
  // deployer.deploy(VickreyAuction, 10, 3);
  deployer.deploy(VickreyAuction);
};
