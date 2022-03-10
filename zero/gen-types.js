const fs = require("fs");
const { typeBundleForPolkadot } = require("@zeroio/type-definitions");

fs.writeFileSync(
  "typesBundle.json",
  `${JSON.stringify(
    {
      spec: {
        zero: typeBundleForPolkadot,
      },
    },
    null,
    2
  )}`
);
