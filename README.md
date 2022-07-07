# Squid Archive setups

## What is an Archive?

Squid Archive collects the historical on-chain data from a Substrate chain and stores it in a normalized form for further processing.
It comes with an optional explorer service exposing the historical blocks, events and extrinsics via a rich GraphQL API, making it a useful exploration and development tool. 


There are currently two major Archive releases incompatible with each other: `v5` and `FireSquid`. The old `v5` archives are considered deprecated and their support will be discontinued. 

## Running in Docker

To run a Squid Archive for a specific chain, navigate to the corresponding folder and run:

```sh
docker-compose up
```

Prometheus metrics are available at `http://localhost:9090/metrics` by default. Inspect `sqd_last_block` for the sync status of the archive. 

**Support for EVM logs (Frontier pallete)**

For chains with Frontier EVM pallete (such Shiden/Astart or Moonriver/Moonbeam), add `--evm-support` to `substrate-gateway` image. It will enable additional query interfaces compatible with [EvmLog handlers](https://github.com/subsquid/squid-evm-template) for downstream Squids.

**Support for WASM (Contracts pallete)**

To support additional indexing capabilities for WASM (`Contracts` pallete) add `--contracts-support` argument to `substrate-gateway`


## How to use an Archive ?

The Archive gateway (exposed on port `8888` in the sample setups) is intended to be used as a data source for [Squid Processor](https://github.com/subsquid/squid/tree/master/substrate-processor). See also [Squid template](https://github.com/subsquid/squid-template) for a basic end-to-end example.

The explorer API can be immediately used with a GraphQL playground available at `http://localhost:4444/graphql` by default. Use the left pane for ad-hoc queries and exploration. 

## Run with Cockroach DB

Both `substrate-ingest` and `substrate-gateway` work with [Cockroach DB](https://www.cockroachlabs.com/docs/) out of the box. To make  `substrate-explorer` compatible as well, set `DB_TYPE` to `cockroach`. 
 
## Running in production

To run an archive in production we recommend:

- Use a container orchestrator like Kubernetes. 
- Use [Cocroach DB](https://www.cockroachlabs.com/docs/cockroachcloud/quickstart) cluster or a separate write (for `substrate-ingest`) and read replicas (for `substrate-explorer` and `substrate-gateway`)
- Monitor prometheus metrics exposed by `substrate-ingest` and `substrate-gateway` (on port `8000`)
- Run multiple instances of `substrate-gateway` behind a load balancer. 

**Hardware requirements**

- For storage, a rule of thumb is to allocate 30GB per 1 million indexed blocks. This is based on our Kusama deployment and may vary depending on the average number of events per block

- We recommend 2GB RAM and 2xCPU per `substrate-gateway` instance
- We recommend 2GB RAM and 2xCPU for `substrate-ingest`


