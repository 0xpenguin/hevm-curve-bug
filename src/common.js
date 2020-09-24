const ethers = require("ethers");

const { ADDRESSES, ABIS } = require("./constants");

const DEFAULT_PROVIDER = "http://localhost:8545";
const DEFAULT_MNEMONIC =
  "myth like bonus scare over problem client lizard pioneer submit female collect";

const provider = new ethers.providers.JsonRpcProvider(
  process.env.PROVIDER_URL || DEFAULT_PROVIDER
);

const wallets = Array(10)
  .fill(0)
  .map((_, i) =>
    ethers.Wallet.fromMnemonic(
      process.env.MNEMONIC || DEFAULT_MNEMONIC,
      `m/44'/60'/0'/0/${i}`
    ).connect(provider)
  );

const [user, governance, strategist, rewards] = wallets;

const swapEthFor = async (ethAmountWei, toToken, user = wallets[0]) => {
  const UniswapV2Router = new ethers.Contract(
    ADDRESSES.UniswapV2.Router2,
    ABIS.UniswapV2.Router2,
    user
  );

  const now = parseInt(new Date().getTime() / 1000);

  const tx = await UniswapV2Router.swapExactETHForTokens(
    0,
    [ADDRESSES.ERC20.WETH, toToken],
    user.address,
    now + 420,
    {
      value: ethAmountWei,
      gasLimit: 900000,
    }
  );

  const txRecp = await tx.wait();

  return txRecp;
};

const getERC20 = (address, user = wallets[0]) => {
  return new ethers.Contract(address, ABIS.ERC20, user);
};

const getContract = (address, abi) => {
  return new ethers.Contract(address, abi);
};

const deployContract = async ({
  abi,
  bytecode,
  args = [],
  deployer = wallets[0],
  user = wallets[0],
}) => {
  const factory = new ethers.ContractFactory(abi, bytecode, deployer);
  const contract = await factory.deploy(...args, { gasLimit: 8000000 });

  await contract.deployed();

  return new ethers.Contract(contract.address, abi, user);
};

module.exports = {
  wallets,
  provider,
  accounts: {
    user,
    governance,
    strategist,
    rewards,
  },
  swapEthFor,
  getERC20,
  deployContract,
  getContract,
};
