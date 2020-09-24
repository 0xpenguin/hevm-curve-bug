const { ethers } = require("ethers");
const { ADDRESSES, ABIS, BYTECODE } = require("./constants");
const {
  accounts,
  swapEthFor,
  getERC20,
  deployContract,
  getContract,
  provider,
} = require("./common");
const { fastForward, mineBlock } = require("./utils");

const { user } = accounts;

const SmartContractChecker = getContract(
  ADDRESSES.CurveFi.SmartContractChecker,
  ABIS.CurveFi.SmartContractChecker,
  user
);

const now = () => parseInt(new Date().getTime() / 1000);

const DAY = 60 * 60 * 24;
const WEEK = DAY * 7;

const CRV = getERC20(ADDRESSES.ERC20.CRV);

const main = async () => {
  const startTime = now();

  await mineBlock(startTime);

  const Bug = await deployContract({
    abi: ABIS.HevmVyperBug,
    bytecode: BYTECODE.HevmVyperBug,
  });

  // Approve whitelist
  await user.sendTransaction({
    to: ADDRESSES.CurveFi.DAO,
    value: ethers.utils.parseEther("1"),
    data: "0x",
  });
  const signer = await provider.getSigner(ADDRESSES.CurveFi.DAO);
  await SmartContractChecker.connect(signer).approveWallet(Bug.address);

  // Gets some CRV and give it to the locker
  await swapEthFor(ethers.utils.parseEther("100"), ADDRESSES.ERC20.CRV);
  const crvBalance = await CRV.balanceOf(user.address);
  await CRV.transfer(Bug.address, crvBalance);
  await Bug.create_lock(crvBalance, startTime + 7 * WEEK, { gasLimit: 600000 });

  console.log("Tests passed");
};

main();
