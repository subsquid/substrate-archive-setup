const fs = require('fs');
const { typesBundleForPolkadot } = require('@acala-network/type-definitions')

fs.writeFileSync('typesBundle.json', `${JSON.stringify(
  {
    spec: typesBundleForPolkadot.spec
  }, null, 2)}`)
