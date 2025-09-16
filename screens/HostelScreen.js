import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, TextInput, ScrollView, Alert } from 'react-native';

const hostels = [
  { id: 1, name: 'Green Stay Hostel', type: 'Budget', price: 1000, image: require('../assets/hotel1.jpg') },
  { id: 2, name: 'Sunset Resort', type: 'Deluxe', price: 2000, image: require('../assets/hotel2.jpg') },
  { id: 3, name: 'Urban Comfort Inn', type: 'Standard', price: 1500, image: require('../assets/hotel3.jpg') },
];

export default function HostelScreen({ navigation, route }) {
  const { flight } = route.params;
  const onSelectHostel = route.params?.onSelectHostel;

  const [selectedHostel, setSelectedHostel] = useState(null);
  const [days, setDays] = useState('1');

  const handleNext = () => {
  if (!selectedHostel) {
    Alert.alert('Error', 'Please select a hostel.');
    return;
  }

  const nights = parseInt(days || '1');
  const hostelData = { 
    ...selectedHostel, 
    days: nights, 
    pricePerNight: selectedHostel.price, // ✅ add this
    totalPrice: selectedHostel.price * nights 
  };

  if (onSelectHostel) onSelectHostel(hostelData);
  navigation.navigate('Payment', { flight, hostel: hostelData });
};

  return (
    <ImageBackground source={require('../assets/explore.jpg')} style={styles.bg} blurRadius={3}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🏨 Hostel Booking</Text>
        <Text style={styles.subtitle}>Flight: {flight.name}</Text>

        {hostels.map((hostel) => (
          <TouchableOpacity
            key={hostel.id}
            style={[
              styles.card,
              selectedHostel?.id === hostel.id && styles.cardSelected,
            ]}
            onPress={() => setSelectedHostel(hostel)}
          >
            <Image source={hostel.image} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{hostel.name}</Text>
              <Text style={styles.cardSubtitle}>{hostel.type} • ₹{hostel.price}/night</Text>
            </View>
          </TouchableOpacity>
        ))}

        <TextInput
          placeholder="Number of Days"
          keyboardType="numeric"
          value={days}
          onChangeText={setDays}
          style={styles.input}
        />

        {selectedHostel && (
          <Text style={styles.totalText}>
            Total: ₹{selectedHostel.price * parseInt(days || '1')}
          </Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#10b981',
  },
  image: {
    width: '100%',
    height: 140,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4,
  },
  input: {
    width: '90%',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 15,
    color: '#fff',
  },
  button: {
    backgroundColor: '#10b981',
    width: '90%',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
