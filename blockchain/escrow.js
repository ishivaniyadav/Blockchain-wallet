// blockchain/escrow.js

// Simulate deposit to escrow
export const depositToEscrow = async (fromAddress, receiverAddress, amount) => {
  console.log(`Simulating deposit from ${fromAddress} to ${receiverAddress} of ${amount} wei`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 'success', txHash: '0xDEMO_TX_HASH_DEPOSIT' });
    }, 1000); // simulate network delay
  });
};

// Simulate release of escrow payment
export const releaseEscrowPayment = async (fromAddress, receiverAddress) => {
  console.log(`Simulating release from ${fromAddress} to ${receiverAddress}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 'released', txHash: '0xDEMO_TX_HASH_RELEASE' });
    }, 1000); // simulate network delay
  });
};

// Simulate full payment process
export const makePayment = async ({ flight, hostel, amount }) => {
  console.log('Starting payment for:', flight, hostel, 'Amount:', amount);

  // Step 1: Deposit to escrow
  const deposit = await depositToEscrow('user_address', 'receiver_address', amount);
  console.log('Deposit result:', deposit);

  // Step 2: Release escrow payment
  const release = await releaseEscrowPayment('user_address', 'receiver_address');
  console.log('Release result:', release);

  // Return a fake transaction hash for demo purposes
  return deposit.txHash;
};
