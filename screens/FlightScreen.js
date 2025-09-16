// screens/FlightScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";

// Flight options with airline names + dynamic pricing (no images)
const flightOptions = [
  {
    id: "F1",
    from: "Ranchi",
    to: "Bangalore",
    date: "2025-09-20",
    price: 5200,
    airline: "IndiGo",
  },
  {
    id: "F2",
    from: "Jamshedpur",
    to: "Delhi",
    date: "2025-09-22",
    price: 4500,
    airline: "Air India",
  },
  {
    id: "F3",
    from: "Dhanbad",
    to: "Mumbai",
    date: "2025-09-25",
    price: 6100,
    airline: "SpiceJet",
  },
  {
    id: "F4",
    from: "Kolkata",
    to: "Goa",
    date: "2025-09-27",
    price: 4800,
    airline: "Vistara",
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

    navigation.navigate("HostelBooking", { flight: selectedFlight });
  };

  const renderFlightCard = ({ item }) => {
    const isSelected = selectedFlight?.id === item.id;
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={() => setSelectedFlight(item)}
      >
        <Text style={styles.airline}>{item.airline}</Text>
        <Text style={styles.cardRoute}>
          {item.from} → {item.to}
        </Text>
        <Text style={styles.cardDate}>🗓 {item.date}</Text>
        <Text style={styles.cardPrice}>₹ {item.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("../assets/bg-landing.jpg")}
      style={styles.bg}
      blurRadius={4}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>✈️ Choose Your Flight</Text>

        <FlatList
          data={flightOptions}
          keyExtractor={(item) => item.id}
          renderItem={renderFlightCard}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next: Select Hostel</Text>
        </TouchableOpacity>
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
    backgroundColor: "rgba(0,0,0,0.55)",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: "#f59e0b",
  },
  airline: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: 4,
  },
  cardRoute: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  cardDate: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#047857",
    marginTop: 6,
  },
  button: {
    width: "85%",
    backgroundColor: "#4f46e5",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
