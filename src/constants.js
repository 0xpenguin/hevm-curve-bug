const DAPP_OUT = require("../out/dapp.sol.json");
const DAPP_CONTRACTS = DAPP_OUT.contracts;

const ADDRESSES = {
  CurveFi: {
    VotingEscrow: "0x5f3b5DfEb7B28CDbD7FAba78963EE202a494e2A2",
    GaugeController: "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB",
    SmartContractChecker: "0xca719728Ef172d0961768581fdF35CB116e0B7a4",
    DAO: "0x40907540d8a6c65c637785e8f8b742ae6b0b9968",
    sCRVGauge: "0xA90996896660DEcC6E997655E065b23788857849",
  },
  ERC20: {
    CRV: "0xD533a949740bb3306d119CC777fa900bA034cd52",
    WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    veCRV: "0x5f3b5DfEb7B28CDbD7FAba78963EE202a494e2A2",
  },
  ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  UniswapV2: {
    Router2: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  },
};

const ABIS = {
  CurveFi: {
    VotingEscrow: DAPP_CONTRACTS["src/HevmVyperBug.sol:ICurveVotingEscrow"].abi,
    SmartContractChecker:
      DAPP_CONTRACTS["src/HevmVyperBug.sol:ICurveSmartContractChecker"].abi,
  },
  UniswapV2: {
    Router2: DAPP_CONTRACTS["src/HevmVyperBug.sol:UniswapRouterV2"].abi,
  },
  ERC20: DAPP_CONTRACTS["src/HevmVyperBug.sol:IERC20"].abi,
  HevmVyperBug: DAPP_CONTRACTS["src/HevmVyperBug.sol:HevmVyperBug"].abi,
};

const BYTECODE = {
  HevmVyperBug: DAPP_CONTRACTS["src/HevmVyperBug.sol:HevmVyperBug"].bin,
};

module.exports = {
  ADDRESSES,
  ABIS,
  BYTECODE,
};
