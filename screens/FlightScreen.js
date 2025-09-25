import { useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get('window');

// Flight options with airline names + dynamic pricing (no images)
const flightOptions = [
  {
    id: "F1",
    from: "Ranchi",
    to: "Bangalore",
    date: "2025-09-20",
    price: 5200,
    airline: "IndiGo",
    duration: "2h 45m",
    stops: "Non-stop"
  },
  {
    id: "F2",
    from: "Jamshedpur",
    to: "Delhi",
    date: "2025-09-22",
    price: 4500,
    airline: "Air India",
    duration: "2h 15m",
    stops: "Non-stop"
  },
  {
    id: "F3",
    from: "Dhanbad",
    to: "Mumbai",
    date: "2025-09-25",
    price: 6100,
    airline: "SpiceJet",
    duration: "3h 20m",
    stops: "1 stop"
  },
  {
    id: "F4",
    from: "Kolkata",
    to: "Goa",
    date: "2025-09-27",
    price: 4800,
    airline: "Vistara",
    duration: "2h 50m",
    stops: "Non-stop"
  },
];

export default function FlightScreen({ navigation, route }) {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const onSelectFlight = route.params?.onSelectFlight;

  const handleNext = () => {
    if (!selectedFlight) {
      alert("Please select a flight!");
      return;
    }
    if (onSelectFlight) onSelectFlight(selectedFlight);

    navigation.navigate("HotelBooking", { flight: selectedFlight });
  };

  const renderFlightCard = ({ item, index }) => {
    const isSelected = selectedFlight?.id === item.id;
    return (
      <TouchableOpacity
        style={[
          styles.card, 
          isSelected && styles.cardSelected,
          { transform: [{ scale: isSelected ? 1.02 : 1 }] }
        ]}
        onPress={() => setSelectedFlight(item)}
        activeOpacity={0.8}
      >
        <View style={styles.cardHeader}>
          <View style={styles.airlineContainer}>
            <View style={styles.airlineBadge}>
              <Text style={styles.airlineCode}>
                {item.airline.substring(0, 2).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.airline}>{item.airline}</Text>
          </View>
          {isSelected && (
            <View style={styles.selectedBadge}>
              <Text style={styles.selectedText}>✓</Text>
            </View>
          )}
        </View>

        <View style={styles.routeContainer}>
          <View style={styles.cityContainer}>
            <Text style={styles.cityCode}>{item.from.substring(0, 3).toUpperCase()}</Text>
            <Text style={styles.cityName}>{item.from}</Text>
          </View>
          
          <View style={styles.flightPath}>
            <View style={styles.line} />
            <Text style={styles.flightIcon}>✈️</Text>
            <View style={styles.line} />
          </View>
          
          <View style={styles.cityContainer}>
            <Text style={styles.cityCode}>{item.to.substring(0, 3).toUpperCase()}</Text>
            <Text style={styles.cityName}>{item.to}</Text>
          </View>
        </View>

        <View style={styles.flightDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{item.duration}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Stops</Text>
            <Text style={styles.detailValue}>{item.stops}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{item.date}</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.cardPrice}>₹{item.price.toLocaleString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("../assets/bg-landing.jpg")}
      style={styles.bg}
      blurRadius={6}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.title}>✈️ Choose Your Flight</Text>
          <Text style={styles.subtitle}>Select the perfect flight for your journey</Text>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={flightOptions}
            keyExtractor={(item) => item.id}
            renderItem={renderFlightCard}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>

        <View style={styles.bottomContainer}>
          {selectedFlight && (
            <View style={styles.selectionSummary}>
              <Text style={styles.summaryText}>
                Selected: {selectedFlight.airline} • ₹{selectedFlight.price.toLocaleString()}
              </Text>
            </View>
          )}
          
          <TouchableOpacity 
            style={[
              styles.button,
              !selectedFlight && styles.buttonDisabled
            ]} 
            onPress={handleNext}
            disabled={!selectedFlight}
          >
            <Text style={[
              styles.buttonText,
              !selectedFlight && styles.buttonTextDisabled
            ]}>
              Next: Select Hotel →
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    marginTop: 8,
    fontWeight: "300",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.98)",
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  cardSelected: {
    borderWidth: 3,
    borderColor: "#f59e0b",
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#f59e0b",
    shadowOpacity: 0.3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  airlineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  airlineBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4f46e5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  airlineCode: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  airline: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e3a8a",
  },
  selectedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f59e0b",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cityContainer: {
    alignItems: "center",
    flex: 1,
  },
  cityCode: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: 1,
  },
  cityName: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
    fontWeight: "500",
  },
  flightPath: {
    flexDirection: "row",
    alignItems: "center",
    flex: 2,
    justifyContent: "center",
  },
  line: {
    height: 2,
    backgroundColor: "#d1d5db",
    flex: 1,
  },
  flightIcon: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  flightDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  detailItem: {
    alignItems: "center",
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: "#6b7280",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
    marginTop: 4,
  },
  priceContainer: {
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    paddingTop: 16,
  },
  priceLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  cardPrice: {
    fontSize: 24,
    fontWeight: "800",
    color: "#047857",
    marginTop: 4,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  selectionSummary: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  summaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#4f46e5",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: "rgba(255,255,255,0.3)",
    shadowOpacity: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  buttonTextDisabled: {
    color: "rgba(255,255,255,0.6)",
  },
});
