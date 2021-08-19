# indexer-setup

Hydra Indexer setups for various chains.

To run a Hydra indexer for a specific e chain, navigate to the corresponding folder and run 

```sh
docker-compose up
```

Then navigate to `localhost:4010/console` and explore the extrinsic and event queries!  

Getting the indexer in sync with the chain may take considerable time. To keep track of the status, use the query

```gql
query {
    indexerStatus {
        head #current indexer block
        chainHeight #current chain height
        inSync
    }
}
```