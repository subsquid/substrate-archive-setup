const fs = require('fs');
const { shidenDefinitions  } = require('@astar-network/types');

fs.writeFileSync('typesBundle.json', `${JSON.stringify({ 
    spec: {
        shiden: {
            types: [
                {
                    minmax: [0,null],
                    types: shidenDefinitions,
            
                }
            ]
        },
    }
}, null, 2)}`)

fs.writeFileSync('types.json', `${JSON.stringify(shidenDefinitions, null, 2)}`)

