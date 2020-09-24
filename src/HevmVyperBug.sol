pragma solidity ^0.6.7;

interface ICurveVotingEscrow {
    function create_lock(uint256, uint256) external;
}

interface ICurveSmartContractChecker {
    function wallets(address) external view returns (bool);
    function approveWallet(address _wallet) external;
}

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

interface UniswapRouterV2 {
    function swapExactETHForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);
}

contract HevmVyperBug {
    address constant crv = 0xD533a949740bb3306d119CC777fa900bA034cd52;
    address constant voting = 0x5f3b5DfEb7B28CDbD7FAba78963EE202a494e2A2;

    function create_lock(uint256 _amount, uint256 _unlockTime) external {
        uint256 _crv = IERC20(crv).balanceOf(address(this));
        require(_crv >= _amount, "!crv");
        IERC20(crv).approve(voting, _amount);
        ICurveVotingEscrow(voting).create_lock(_amount, _unlockTime);
    }
}
