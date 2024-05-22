# Squid Archive setups

> [!CAUTION]
> V1 Subsquid Archives are deprecated in favor of [Subsquid Network](https://docs.subsquid.io/subsquid-network/).

## What is an Archive?

Squid Archive collects the historical on-chain data from a Substrate chain and stores it in a normalized form for further processing.
It comes with an optional explorer service exposing the historical blocks, events and extrinsics via a rich GraphQL API, making it a helpful exploration and development tool. 


There are currently two major Archive releases incompatible with each other: `v5` and `FireSquid`. The old `v5` archives are considered deprecated, and their support will be discontinued. 

## Running in Docker

To run a Squid Archive for a specific chain, change the WebSocket endpoints in `docker-compose.yml` and run:

```sh
docker-compose up
```

The explorer will be up at `http://localhost:4444/graphql` and the data source endpoint (compatible with [Squid Processor](https://github.com/subsquid/squid-template) at port `8888`).

Prometheus metrics are available at `http://localhost:9090/metrics` by default. Inspect `sqd_last_block` for the sync status of the archive. 


**Support for EVM logs (Frontier pallete)**

For chains with Frontier EVM pallete (such as Shiden/Astar or Moonriver/Moonbeam), add `--evm-support` to `substrate-gateway` image. It will enable additional query interfaces compatible with [EvmLog handlers](https://github.com/subsquid/squid-evm-template) for downstream Squids.

See `docker-compose-evm.yml` for a Moonbase-alpha archive setup.

**Support for WASM (Contracts pallete)**

To support additional indexing capabilities for WASM (`Contracts` pallete) add `--contracts-support` argument to `substrate-gateway`

**Type bundles**

For most chains, `substrate-ingest` will process all historical blocks without additional setup.  

In some rare cases, to decode old unrecognized (pre-v14 metadata) blocks, add `--types-bundle <json with type definitions>` argument to `substrate-ingest`. Note that the types bundle format is [slightly different](https://github.com/subsquid/squid-sdk/tree/master/substrate/substrate-metadata/src/old/definitions) than that of `polkadot.js`

## How to use an Archive?

The Archive gateway (exposed on port `8888` in the sample setups) is intended to be used as a data source for [Squid Processor](https://github.com/subsquid/squid-sdk/tree/master/substrate/substrate-processor). See also [Squid template](https://github.com/subsquid/squid-template) for a basic end-to-end example.

The explorer API can be immediately used with a GraphQL playground available at `http://localhost:4444/graphql` by default. Use the left pane for ad-hoc queries and exploration. 

## Run with Cockroach DB

Both `substrate-ingest` and `substrate-gateway` work with [Cockroach DB](https://www.cockroachlabs.com/docs/) out of the box. To make  `substrate-explorer` compatible as well, set `DB_TYPE` to `cockroach`. 

## Running with local Substrate node

Initially, the local Substrate node runs on the URL `ws://127.0.0.1:9944`.
Make sure that the archive can connect to the node via proper [docker network setup](https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach)

```yml
    command: [
       "-e", "ws://host.docker.internal:9944",
    ]
 ```

## Running in production

To run an archive in production, we recommend the following:

- Use a container orchestrator like Kubernetes. 
- Use [Cocroach DB](https://www.cockroachlabs.com/docs/cockroachcloud/quickstart) cluster or a separate write (for `substrate-ingest`) and read replicas (for `substrate-explorer` and `substrate-gateway`)
- Monitor Prometheus metrics exposed by `substrate-ingest` and `substrate-gateway` (on port `8000`)
- Run multiple instances of `substrate-gateway` behind a load balancer. 

**Hardware requirements**

- A rule of thumb is to allocate 30GB per 1 million indexed blocks for storage. This is based on our Kusama deployment and may vary depending on the average number of events per block

- We recommend 2GB RAM and 2xCPU per `substrate-gateway` instance
- We recommend 2GB RAM and 2xCPU for `substrate-ingest`
