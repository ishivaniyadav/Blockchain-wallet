import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";

export default function HomeScreen({ navigation }) {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState(null);

  const handleFlightBooking = () => {
    navigation.navigate("FlightBooking", {
      onSelectFlight: (flight) => setSelectedFlight(flight),
    });
  };

  const handleHostelBooking = () => {
    if (!selectedFlight) {
      alert("Please select a flight first!");
      return;
    }
    navigation.navigate("HostelBooking", {
      flight: selectedFlight,
      onSelectHostel: (hostel) => setSelectedHostel(hostel),
    });
  };

  const handlePayment = () => {
    if (!selectedFlight || !selectedHostel) {
      alert("Please select both flight and hostel first!");
      return;
    }
    navigation.navigate("Payment", {
      flight: selectedFlight,
      hostel: selectedHostel,
    });
  };

  return (
    <ImageBackground
      source={require("../assets/bg-landing.jpg")}
      style={styles.bg}
      blurRadius={2}
    >
      <View style={styles.overlay}>
        {/* Logo */}
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Blockchain Travel</Text>
        <Text style={styles.subtitle}>
          Book Flights & Hotels with Secure Blockchain Payments
        </Text>

        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={handleFlightBooking}>
          <Text style={styles.buttonText}>✈️ Book Flight</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleHostelBooking}>
          <Text style={styles.buttonText}>🏨 Book Hostel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.paymentButton]}
          onPress={handlePayment}
        >
          <Text style={styles.buttonText}>💰 Proceed to Payment</Text>
        </TouchableOpacity>

        {/* Summary */}
        <View style={styles.summary}>
          {selectedFlight && (
            <Text style={styles.summaryText}>
              ✈️ Flight: {selectedFlight.name}
            </Text>
          )}
          {selectedHostel && (
            <Text style={styles.summaryText}>
              🏨 Hostel: {selectedHostel.name}
            </Text>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#f1f5f9",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  button: {
    width: "85%",
    backgroundColor: "#4f46e5",
    paddingVertical: 16,
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  paymentButton: {
    backgroundColor: "#f59e0b",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  summary: {
    marginTop: 30,
    width: "90%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginVertical: 3,
  },
});
