import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  Image, 
  TextInput, 
  ScrollView, 
  Alert,
  Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

const hotels = [
  { id: 1, name: 'Green Stay Hotel', type: 'Budget', price: 1000, image: require('../assets/hotel1.jpg'), rating: 4.2, amenities: ['WiFi', 'AC', 'Breakfast'] },
  { id: 2, name: 'Sunset Resort', type: 'Deluxe', price: 2000, image: require('../assets/hotel2.jpg'), rating: 4.8, amenities: ['Pool', 'Spa', 'Room Service'] },
  { id: 3, name: 'Urban Comfort Inn', type: 'Standard', price: 1500, image: require('../assets/hotel3.jpg'), rating: 4.5, amenities: ['WiFi', 'Gym', 'Parking'] },
];

export default function HotelScreen({ navigation, route }) {
  const { flight } = route.params;
  const onSelectHotel = route.params?.onSelectHotel;

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [days, setDays] = useState('1');

  const handleNext = () => {
    if (!selectedHotel) {
      Alert.alert('Error', 'Please select a hotel.');
      return;
    }

    const nights = parseInt(days || '1');
    const hotelData = { 
      ...selectedHotel, 
      days: nights, 
      pricePerNight: selectedHotel.price,
      totalPrice: selectedHotel.price * nights 
    };

    if (onSelectHotel) onSelectHotel(hotelData);
    navigation.navigate('Payment', { flight, hotel: hotelData });
  };

  const renderAmenities = (amenities) => {
    return amenities.map((amenity, index) => (
      <View key={index} style={styles.amenityTag}>
        <Text style={styles.amenityText}>{amenity}</Text>
      </View>
    ));
  };

  return (
    <ImageBackground source={require('../assets/explore.jpg')} style={styles.bg} blurRadius={4}>
      <View style={styles.overlay}>
        <ScrollView 
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>🏨 Choose Your Stay</Text>
            <Text style={styles.subtitle}>
              Flight: {flight.airline} • {flight.from} → {flight.to}
            </Text>
          </View>

          <View style={styles.cardContainer}>
            {hotels.map((hotel) => {
              const isSelected = selectedHotel?.id === hotel.id;
              return (
                <TouchableOpacity
                  key={hotel.id}
                  style={[
                    styles.card,
                    isSelected && styles.cardSelected,
                    { transform: [{ scale: isSelected ? 1.02 : 1 }] }
                  ]}
                  onPress={() => setSelectedHotel(hotel)}
                  activeOpacity={0.8}
                >
                  <View style={styles.imageContainer}>
                    <Image source={hotel.image} style={styles.image} />
                    {isSelected && (
                      <View style={styles.selectedOverlay}>
                        <View style={styles.selectedBadge}>
                          <Text style={styles.selectedIcon}>✓</Text>
                        </View>
                      </View>
                    )}
                    <View style={styles.typeTag}>
                      <Text style={styles.typeText}>{hotel.type}</Text>
                    </View>
                  </View>

                  <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>{hotel.name}</Text>
                      <View style={styles.ratingContainer}>
                        <Text style={styles.ratingIcon}>⭐</Text>
                        <Text style={styles.ratingText}>{hotel.rating}</Text>
                      </View>
                    </View>

                    <View style={styles.amenitiesContainer}>
                      {renderAmenities(hotel.amenities)}
                    </View>

                    <View style={styles.priceRow}>
                      <Text style={styles.priceLabel}>Per Night</Text>
                      <Text style={styles.cardPrice}>₹{hotel.price.toLocaleString()}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.bookingSection}>
            <Text style={styles.sectionTitle}>Booking Details</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Number of Nights</Text>
              <TextInput
                placeholder="Enter nights"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                value={days}
                onChangeText={setDays}
                style={styles.input}
              />
            </View>

            {selectedHotel && (
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Selected Hotel:</Text>
                  <Text style={styles.summaryValue}>{selectedHotel.name}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Price per night:</Text>
                  <Text style={styles.summaryValue}>₹{selectedHotel.price.toLocaleString()}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Number of nights:</Text>
                  <Text style={styles.summaryValue}>{days || '1'}</Text>
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Total Amount:</Text>
                  <Text style={styles.totalPrice}>
                    ₹{(selectedHotel.price * parseInt(days || '1')).toLocaleString()}
                  </Text>
                </View>
              </View>
            )}
          </View>

          <TouchableOpacity 
            style={[
              styles.button,
              !selectedHotel && styles.buttonDisabled
            ]} 
            onPress={handleNext}
            disabled={!selectedHotel}
          >
            <Text style={[
              styles.buttonText,
              !selectedHotel && styles.buttonTextDisabled
            ]}>
              Proceed to Payment →
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '300',
  },
  cardContainer: {
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cardSelected: {
    borderWidth: 3,
    borderColor: '#10b981',
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: '#10b981',
    shadowOpacity: 0.3,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  selectedIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  typeTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  amenityTag: {
    backgroundColor: '#e5f3ff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  amenityText: {
    fontSize: 12,
    color: '#1e40af',
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 16,
  },
  priceLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#10b981',
  },
  bookingSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: '500',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  summaryCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
    paddingTop: 16,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  totalPrice: {
    fontSize: 24,
    color: '#10b981',
    fontWeight: '800',
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: '#10b981',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  buttonTextDisabled: {
    color: 'rgba(255,255,255,0.6)',
  },
});