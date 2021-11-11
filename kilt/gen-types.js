const fs = require('fs');
const { typeBundleForPolkadot } = require('@kiltprotocol/type-definitions');

const problemVersion = 25;  // HACK: should be removed after fixing in @kiltprotocol/type-definitions
const typesBundle = {types: typeBundleForPolkadot.types.map(({minmax, types}) => {
    const [minVersion] = minmax;
    if (minVersion >= problemVersion) {
        types = Object.assign({}, types, {'Keys': 'SessionKeys1'});
    }
    return { minmax, types }
})};
fs.writeFileSync('typesBundle.json', JSON.stringify({
    spec: {
        'mashnet-node': typesBundle,
        'kilt-spiritnet': typesBundle,
    }
}, null, 2));
