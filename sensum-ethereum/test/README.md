# Sensations contract tests

These are the hardhat tests for the sensations smart contract

## Run

To run only the basic contract tests, as it would be used in a CI/CD pipeline, run:

```bash
npm run test:basic
```

To run a stress tests containing all the legacy sensations of the old app, run:

```bash
npm run test:legacy
```

To run them all together:

```bash
npm run test
```

## Legacy sensations

In order to generate the `legacy-sensations.json` file, the following steps must be taken:

1. Fetch the sensations from the Sensum API

   ```bash
   $ curl -sX POST 'https://sensum-server.herokuapp.com/api/sensations/letThemFlow' -H 'Content-Type: application/json' -d '{"offset": 0, "limit": 0}' > /tmp/sensations.json
   ```

2. Run a cli for `node`, and apply the following commands to import and format the sensations:

   ```js
   ethers = require('ethers');
   sens = require('/tmp/sensations.json');
   formattedSens = sens
     .map(({ author, message, timestamp }) => ({
       avatar: ethers.utils.sha256(Buffer.from(author)),
       message,
       timestamp,
     }))
     .reverse();
   ```

3. Having the sensations, now you can filter the ones you think it shouldn't be appropiate to a public repository (🤦‍♂️)

4. And finally write the json to a file:

   ```js
   fs = require('fs');
   fs.writeFile('legacy-sensations.json', JSON.stringify(formattedSens, null, 2), () => {});
   ```
