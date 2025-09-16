import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FlightScreen from '../screens/FlightScreen';
import HostelScreen from '../screens/HostelScreen';
import PaymentScreen from '../screens/PaymentScreen';
import SuccessScreen from '../screens/SuccessScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="FlightBooking" component={FlightScreen} options={{ title: 'Flight Booking' }} />
      <Stack.Screen name="HostelBooking" component={HostelScreen} options={{ title: 'Hostel Booking' }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Payment' }} />
      <Stack.Screen name="Success" component={SuccessScreen} options={{ title: 'Success' }} />
    </Stack.Navigator>
  );
}
