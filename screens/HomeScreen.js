import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleFlightBooking = () => {
    navigation.navigate("FlightBooking", {
      onSelectFlight: (flight) => setSelectedFlight(flight),
    });
  };

  const handleHotelBooking = () => {
    if (!selectedFlight) {
      alert("Please select a flight first!");
      return;
    }
    navigation.navigate("HotelBooking", {
      flight: selectedFlight,
      onSelectHotel: (hotel) => setSelectedHotel(hotel),
    });
  };

  const handlePayment = () => {
    if (!selectedFlight || !selectedHotel) {
      alert("Please select both flight and hotel first!");
      return;
    }
    navigation.navigate("Payment", {
      flight: selectedFlight,
      hotel: selectedHotel,
    });
  };

  return (
    <LinearGradient
      colors={["#1e3c72", "#2a5298", "#3a1c71"]}
      style={styles.bg}
    >
      {/* Animated Blobs */}
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={3000}
        style={[styles.blob, { top: 80, left: 50, backgroundColor: "#ffffff20" }]}
      />
      <Animatable.View
        animation="bounce"
        iterationCount="infinite"
        duration={4000}
        style={[styles.blob, { bottom: 100, right: 40, backgroundColor: "#ffffff15" }]}
      />

      <View style={styles.overlay}>
        {/* Logo and Title */}
        <Animatable.View animation="fadeInDown" style={{ alignItems: "center" }}>
          <View style={styles.logoWrapper}>
            <Text style={{ fontSize: 42 }}>✈️</Text>
          </View>
          <Text style={styles.title}>Blockchain Travel</Text>
          <Text style={styles.subtitle}>
            Book Flights & Hotels with Secure Blockchain Payments
          </Text>
        </Animatable.View>

        {/* Action Buttons */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.buttons}>
          <TouchableOpacity onPress={handleFlightBooking} activeOpacity={0.8}>
            <LinearGradient colors={["#2563eb", "#1d4ed8"]} style={styles.button}>
              <Text style={styles.buttonText}>✈️ Book Flight</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleHotelBooking} activeOpacity={0.8}>
            <LinearGradient colors={["#059669", "#047857"]} style={styles.button}>
              <Text style={styles.buttonText}>🏨 Book Hotel</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePayment} activeOpacity={0.8}>
            <LinearGradient colors={["#f59e0b", "#d97706"]} style={styles.button}>
              <Text style={styles.buttonText}>💰 Proceed to Payment</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>

        {/* Summary Card */}
        {(selectedFlight || selectedHotel) && (
          <BlurView intensity={70} tint="light" style={styles.summary}>
            <Text style={styles.summaryTitle}>📋 Your Selection</Text>
            {selectedFlight && (
              <Text style={styles.summaryText}>✈️ {selectedFlight.name}</Text>
            )}
            {selectedHotel && (
              <Text style={styles.summaryText}>🏨 {selectedHotel.name}</Text>
            )}
          </BlurView>
        )}

        {/* Features Grid */}
        <View style={styles.features}>
          {[
            { icon: "🔐", title: "Secure", desc: "Blockchain-powered safety" },
            { icon: "⚡", title: "Instant", desc: "Real-time confirmations" },
            { icon: "🌍", title: "Global", desc: "Worldwide coverage" },
          ].map((f, i) => (
            <Animatable.View
              key={i}
              animation="fadeInUp"
              delay={600 + i * 200}
              style={styles.featureCard}
            >
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </Animatable.View>
          ))}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: "center" },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#fcd34d",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#dbeafe",
    marginBottom: 25,
    textAlign: "center",
    paddingHorizontal: 15,
  },
  buttons: { width: "100%", maxWidth: 360, marginBottom: 20 },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    marginVertical: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  summary: {
    marginTop: 15,
    width: width * 0.9,
    borderRadius: 14,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  summaryTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8, color: "#111" },
  summaryText: { fontSize: 16, fontWeight: "500", marginVertical: 2, color: "#222" },
  features: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
  },
  featureCard: {
    flex: 1,
    marginHorizontal: 6,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
  },
  featureIcon: { fontSize: 24, marginBottom: 6 },
  featureTitle: { fontSize: 14, fontWeight: "700", color: "#fff" },
  featureDesc: { fontSize: 12, color: "#e0e7ff", textAlign: "center" },
  blob: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});
