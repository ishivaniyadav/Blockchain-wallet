import React from 'react';
import { Button } from 'react-native';

// Dummy payment button for now
export default function PaymentButton({ onPay }) {
  return <Button title="Pay Now" onPress={onPay} />;
}
