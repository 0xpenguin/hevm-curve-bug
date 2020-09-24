pragma solidity ^0.6.7;

import "ds-test/test.sol";

import "./HevmCurveBug.sol";

contract HevmCurveBugTest is DSTest {
    HevmCurveBug bug;

    function setUp() public {
        bug = new HevmCurveBug();
    }

    function testFail_basic_sanity() public {
        assertTrue(false);
    }

    function test_basic_sanity() public {
        assertTrue(true);
    }
}
