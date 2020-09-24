pragma solidity ^0.6.7;

import "ds-test/test.sol";

import "./HevmVyperBug.sol";

interface Hevm {
    function warp(uint256) external;

    function store(
        address c,
        bytes32 loc,
        bytes32 val
    ) external;
}

contract HevmCurveBugTest is DSTest {
    HevmVyperBug bug;
    Hevm hevm;

    UniswapRouterV2 univ2 = UniswapRouterV2(
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
    );

    address curveSmartContractChecker = 0xca719728Ef172d0961768581fdF35CB116e0B7a4;

    address eth = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    address weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address crv = 0xD533a949740bb3306d119CC777fa900bA034cd52;

    function setUp() public {
        bug = new HevmVyperBug();
        hevm = Hevm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

        // Approve our strategy on smartContractWhitelist
        // Modify storage value so we are approved by the smart-wallet-white-list
        // storage in solidity - https://ethereum.stackexchange.com/a/41304
        bytes32 key = bytes32(uint256(address(bug)));
        bytes32 pos = bytes32(0); // pos 0 as its the first state variable
        bytes32 loc = keccak256(abi.encodePacked(key, pos));
        hevm.store(curveSmartContractChecker, loc, bytes32(uint256(1)));

        // Make sure our crvLocker is whitelisted
        assertTrue(
            ICurveSmartContractChecker(curveSmartContractChecker).wallets(
                address(bug)
            )
        );
    }

    function _swapEthFor(address _to, uint256 _amount) internal {
        address[] memory path;

        path = new address[](2);
        path[0] = weth;
        path[1] = _to;

        univ2.swapExactETHForTokens{value: _amount}(
            0,
            path,
            address(this),
            now + 60
        );
    }

    // Tests

    function test_create_lock() public {
        // Get CRV and send to contract
        _swapEthFor(crv, 10 ether);
        uint256 _crv = IERC20(crv).balanceOf(address(this));
        IERC20(crv).transfer(address(bug), _crv);
        bug.create_lock(_crv, block.timestamp + 5 weeks);
    }
}
