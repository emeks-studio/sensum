# Basic Sample Hardhat Project

Ref. https://hardhat.org/getting-started/

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Interaction between Hardhat and Remix IDE:

if you want to play around with [Remix](https://remix.ethereum.org/) using the chain exposed by Hardhat, you should:

1. Start your (local) "mock" chain:
```
$ npx hardhat node
```

2. In another console, deploy your contrat in your local network:
```
$ npx hardhat run scripts/sensations-deploy.js --network localhost
> Greeter deployed to: 0xSomeAddress
```

3. Then enter into Remix and connected to your local network.

4. Import `Greeter.sol` contract and compile it.

5. Select the previously compiled contract in Remix and use the obtained address from step 2) in order to load the ABI. That way you will be able to interact with your contract using Remix.
