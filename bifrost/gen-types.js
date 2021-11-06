const fs = require('fs');
const { typesBundleForPolkadot } = require('@bifrost-finance/type-definitions')

fs.writeFileSync('typesBundle.json', `${JSON.stringify(
    { spec: {
        biforst: typesBundleForPolkadot.spec.bifrost, 
        asgard: typesBundleForPolkadot.spec.asgard
      }
    }, null, 2)}`)
const lastTypes = typesBundleForPolkadot.spec.bifrost.types[typesBundleForPolkadot.spec.bifrost.types.length - 1].types
fs.writeFileSync('types.json', `${JSON.stringify(lastTypes, null, 2)}`)
