const fs = require('fs');
const { versionedKhala } = require('@phala/typedefs');

fs.writeFileSync('typesBundle.json', JSON.stringify({
    spec: {
        khala: {
            types: versionedKhala
        }
    }
}, null, 2));
