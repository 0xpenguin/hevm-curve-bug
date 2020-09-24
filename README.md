# HEVM Vyper Bug

Repository to illustrate HEVM bug with a Vyper contract.


```bash
yarn

dapp build

# Fails
DAPP_TEST_TIMESTAMP=$(date +%s) DAPP_TEST_BALANCE_CREATE=90000000000000000000000000 dapp test --rpc-url <RPC-URL>

# Runs ganache for ganache-test
ganache-cli -f <RPC-URL> -d -e 10000000 --networkId 1 -l 90000000 --unlock 0x40907540d8a6c65c637785e8f8b742ae6b0b9968

# Successful
node src/ganache-test.js
```