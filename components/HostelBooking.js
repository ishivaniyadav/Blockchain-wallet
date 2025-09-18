import React, { useState } from 'react';
import { View } from 'react-native';
import HotelBooking from '../components/HotelBooking';
import EscrowStatus from '../components/EscrowStatus';

export default function HotelScreen() {
  const [hotelData, setHotelData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleNext = (data) => {
    setHotelData(data);
    // For demo, automatically show "completed" status
    setPaymentStatus('completed');
  };

  if (paymentStatus) {
    return <EscrowStatus status={paymentStatus} />;
  }

  return (
    <View>
      <HotelBooking onNext={handleNext} />
    </View>
  );
}
