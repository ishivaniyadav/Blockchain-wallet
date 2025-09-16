import React, { useState } from 'react';
import { View } from 'react-native';
import HostelBooking from '../components/HostelBooking';
import EscrowStatus from '../components/EscrowStatus';

export default function HostelScreen() {
  const [hostelData, setHostelData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleNext = (data) => {
    setHostelData(data);
    // For demo, automatically show "completed" status
    setPaymentStatus('completed');
  };

  if (paymentStatus) {
    return <EscrowStatus status={paymentStatus} />;
  }

  return (
    <View>
      <HostelBooking onNext={handleNext} />
    </View>
  );
}
