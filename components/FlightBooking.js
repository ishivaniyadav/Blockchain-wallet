import React, { useState } from 'react';
import { View } from 'react-native';
import FlightBooking from '../components/FlightBooking';
import EscrowStatus from '../components/EscrowStatus';

export default function FlightScreen() {
  const [flightData, setFlightData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleNext = (data) => {
    setFlightData(data);
    // For demo, automatically show "completed" status
    setPaymentStatus('completed');
  };

  if (paymentStatus) {
    return <EscrowStatus status={paymentStatus} />;
  }

  return (
    <View>
      <FlightBooking onNext={handleNext} />
    </View>
  );
}
