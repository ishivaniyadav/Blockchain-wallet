import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EscrowStatus({ status }) {
  // status can be 'pending', 'completed', 'failed'
  let message = '';
  if (status === 'pending') message = 'Payment is pending in Escrow...';
  if (status === 'completed') message = 'Payment completed successfully!';
  if (status === 'failed') message = 'Payment failed. Try again.';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  text: { fontSize: 18, textAlign: 'center' },
});
