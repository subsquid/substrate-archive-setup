const fs = require('fs');

//from https://github.com/polkadot-js/apps/blob/master/packages/apps-config/src/api/spec/astar.ts
const definitions = {
  types: [
    {
      // on all versions
      minmax: [0, undefined],
      types: {
        Keys: 'AccountId',
        Address: 'MultiAddress',
        LookupSource: 'MultiAddress',
        AmountOf: 'Amount',
        Amount: 'i128',
        SmartContract: {
          _enum: {
            Evm: 'H160',
            Wasm: 'AccountId'
          }
        },
        EraStakingPoints: {
          total: 'Balance',
          stakers: 'BTreeMap<AccountId, Balance>',
          formerStakedEra: 'EraIndex',
          claimedRewards: 'Balance'
        },
        EraRewardAndStake: {
          rewards: 'Balance',
          staked: 'Balance'
        },
        EraIndex: 'u32'
      }
    }
  ]
};

fs.writeFileSync('typesBundle.json', `${JSON.stringify(
  {
    spec: {
      astar: definitions
    }
  }, null, 2)}`)
