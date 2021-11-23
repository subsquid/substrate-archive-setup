const fs = require('fs');
const { typesBundleForPolkadot } = require('@crustio/type-definitions');

fs.writeFileSync('typesBundle.json', JSON.stringify(typesBundleForPolkadot, null, 2));
