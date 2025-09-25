import { useState } from 'react';
import { View } from 'react-native';
import EscrowStatus from './EscrowStatus';
import HotelBooking from './HotelBooking';

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
