# Squid Archive setups

## Running Docker Compose

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

## Running Helm Chart

To run a Squid Archive for a specific chain, navigate to the corresponding folder and to the /chart folder and run

```sh
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm dependency build
helm install squid .
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

The provided docker compose setup is a minimal configuration best suitable for dev and testing envorinmonents. For a stable production deployment we recommend the following.

- Use a private gRPC endpoint (`WS_PROVIDER_ENDPOINT_URI` env variable)
- Use managed Postgres database with non-root access (`DB_*` env variables)
- Collect and monitor [Prometheus](https://prometheus.io/) metrics exposed at port 9090
- Increase `WORKERS_NUMBER` to speed up the syncing. Usually somewhere between 5-50 workers is a sweet spot depending on the gRPC endpoint capacity.

To reliably run a Squid Archive we recommend 16GB RAM and modern CPU. Database storage requirements depend on the size of the network. A rule of thumb is to reserve around 100 kb per block, so e.g. for Kusama with ~10M blocks one needs about 1Tb for Postgres storage.

## Type definitons updates

Most chains publish type definitions as an npm package. Some archives (e.g. shiden or bifrost) has a script `gen-types.js` for generating the json type defintions. To update, run from the corresponding folder

```bash
yarn upgrade
node gen-types.js
```
