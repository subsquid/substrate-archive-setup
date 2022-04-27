# Squid Archive setups

## What is a Squid Archive?

Squid Archive collects the historical on-chain data from a Substrate chain and exposes it via a GraphQL endpoint with powerful filtering and search capabilities over historical blocks, events and transactions. Deployed archives for Polkadot, Kusama and most parachains can be found in [Archive Registry](https://github.com/subsquid/archive-registry/blob/main/archives.json)


## How to use an Archive ?

The primary use case of a Squid Archive is to serve data to a [Squid Processor](https://github.com/subsquid/squid/tree/master/substrate-processor)

The urls are not supposed to be accessed with a browser. To explore the endpoint with an interactive and human-friendly console, replace `/graphql` with `/console` in the url. 

For example, for exploring Kusama historical data, open `https://kusama.indexer.gc.subsquid.io/v4/console` and use the pane on right hand side to filter (`where:`) and pick the fields of interest.

For example, the following query will return details on the last 10 transfers:

```gql
query RecentBalancesTransfers {
  substrate_event(where: {name: {_eq: "balances.Transfer"}}, limit: 10, order_by: {blockNumber: desc}) {
    blockNumber
    blockId
    data
  }
}
```


## Running Docker Compose

Squid Archive setups for various chains.

To run a Squid Archive for a specific chain, navigate to the corresponding folder and run:

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

## Running Helm Chart

To run a Squid Archive for a specific chain, navigate to the corresponding folder and to the /chart folder and run

```sh
helm dependency build
helm install squid . --set-file squid.typesBundle=../typesBundle.json (or --set-file squid.types=../types.json)
```

Then navigate to `localhost:80/console` and explore the extrinsic and event queries!

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

Be aware the storage capacity of the persistent volume in `db.pv.yaml` is just 5Gi, so you need to adjust it to your current system.

## Running in production

The provided docker compose setup is a minimal configuration suitable for dev and testing environments. For a stable production deployment, we recommend the following.

- Use a private gRPC endpoint (`WS_PROVIDER_ENDPOINT_URI` env variable)
- Use managed Postgres database with non-root access (`DB_*` env variables)
- Collect and monitor [Prometheus](https://prometheus.io/) metrics exposed at port 9090. A reference Graphana dashboard can be imported from `graphana.json`
- Increase `WORKERS_NUMBER` to speed up the syncing. Usually, somewhere between 5-50 workers is a sweet spot depending on the gRPC endpoint capacity.
- Activate a built-in [liveness probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/):

```yaml
livenessProbe:
  exec:
    command:
      - /livnesprobe.sh
  initialDelaySeconds: 300
  failureThreshold: 1
  periodSeconds: 300
```

We recommend 4GB RAM and a modern CPU to run a Squid Archive reliably. Database storage requirements depend on the size of the network. A rule of thumb is to reserve around 100 kb per block, so, e.g. for Kusama with ~10M blocks, one needs about 1Tb for Postgres storage.

## Type definitons updates

Most chains publish type definitions as an npm package. Some archives (e.g. shiden or bifrost) have a script `gen-types.js` to generate the JSON type definitions. To update, run from the corresponding folder.

```bash
yarn upgrade
node gen-types.js
```

