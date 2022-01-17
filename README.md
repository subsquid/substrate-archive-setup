# Squid Archive setups

Squid Archive setups for various chains.

To run a Squid Archive for a specific chain, navigate to the corresponding folder and run 

```sh
docker-compose up
```

Then navigate to `localhost:4010/console` and explore the extrinsic and event queries!  

Getting the archive in sync with the chain may take considerable time. To keep track of the status, use the following query.

```gql
query {
    indexerStatus {
        head #current indexer block
        chainHeight #current chain height
        inSync
    }
}
```

## Type definitons updates

Most chains publish type definitions as an npm package. Some archives (e.g. shiden or bifrost) has a script `gen-types.js` for generating the json type defintions. To update, run from the corresponding folder

```bash
yarn upgrade 
node gen-types.js
```
