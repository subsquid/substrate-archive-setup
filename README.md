# Squid Archive setups

## What is an Archive?

Squid Archive collects the historical on-chain data from a Substrate chain and stores it in a normalized form for further processing.
It comes with an optional explorer service exposing the historical blocks, events and extrinsics via a rich GraphQL API, making it a useful exploration and development tool. 

## Difference between v5 and FireSquid Archives

The FireSquid release brought about significant performance improvements:

- FireSquid archives can concurrently source blocks from multiple endpoints. The synchronization can be as fast as 2000 blocks per second and is bottlenecked only by the database writes. 
- FireSquid is around 5x more storage-efficient compared to v5. 
- FireSquid API supports a more efficient batching interface to be used in combination with squid processors. 

FireSquid archives come with experimental support of Cockroach DB clusters as a storage database, making it horizontally scalable. 

FireSquid Archives natively support lookups for calls wrapped in `batch`, `sudo` and `proxy` extrinsics. 



## How to use an Archive ?

The Archive gateway (exposed on port `8888` in the sample setups) is intended to be used as a data source for [Squid Processor](https://github.com/subsquid/squid/tree/master/substrate-processor). See also [Squid template](https://github.com/subsquid/squid-template) for a basic end-to-end example.

The explorer API can be immediately used with a GraphQL playground available at `http://localhost:4444/graphql` by default. Use the left pane for ad-hoc queries and exploration. 

## Running Docker Compose

To run a Squid Archive for a specific chain, navigate to the corresponding folder and run:

```sh
docker-compose up
```

Prometheus metrics are available at `http://localhost:9090/metrics` by default. Inspect `sqd_last_block` for the sync status of the archive. 

## Running in production

TBD

