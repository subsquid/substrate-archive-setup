const fs = require('fs');
const { moonbeamDefinitions } = require('moonbeam-types-bundle')

fs.writeFileSync('typesBundle.json', `${JSON.stringify(
  {
    spec: {
      moonbeam: {
        types: moonbeamDefinitions.types,
        alias: moonbeamDefinitions.alias
      }
    }
  }, null, 2)}`)
