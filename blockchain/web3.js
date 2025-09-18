// blockchain/web3.js

// Dummy Web3 mock for demo purposes
const web3 = {
  eth: {
    Contract: function () {
      return {
        methods: {
          deposit: (receiver) => ({
            send: ({ from, value }) => {
              console.log(`Simulated deposit from ${from} to ${receiver} of ${value} wei`);
              return Promise.resolve({ status: 'success', txHash: '0xDEMO_TX_HASH' });
            },
          }),
          release: (receiver) => ({
            send: ({ from }) => {
              console.log(`Simulated release from ${from} to ${receiver}`);
              return Promise.resolve({ status: 'released', txHash: '0xDEMO_TX_HASH' });
            },
          }),
        },
      };
    },
  },
};

export default web3;
