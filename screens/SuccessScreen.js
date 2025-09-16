import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SuccessScreen({ navigation, route }) {
  const { txHash, flight, hostel, totalAmount } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Success Illustration */}
      <Image
        source={require("../assets/success.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Payment Successful 🎉</Text>
      <Text style={styles.subtitle}>Your booking is confirmed!</Text>

      {/* Transaction Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Booking Summary</Text>
        <Text style={styles.detail}>✈ Flight: {flight?.name} (${flight?.price})</Text>
        <Text style={styles.detail}>
          🏨 Hostel: {hostel?.name} (${hostel?.pricePerNight} × {hostel?.days} nights)
        </Text>
        <Text style={styles.detailTotal}>💵 Total Paid: {totalAmount} USDC</Text>
      </View>

      {/* Tx Hash */}
      {txHash && (
        <View style={styles.txBox}>
          <Ionicons name="link-outline" size={18} color="#0369a1" />
          <Text style={styles.txText}>Tx Hash:</Text>
          <Text style={styles.txHash}>{txHash}</Text>
        </View>
      )}

      {/* Back to Home */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="home-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#065f46",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 25,
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#111827",
  },
  detail: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 6,
  },
  detailTotal: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 6,
    color: "#065f46",
  },
  txBox: {
    backgroundColor: "#e0f2fe",
    borderRadius: 10,
    padding: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  txText: {
    fontSize: 14,
    color: "#0369a1",
    marginTop: 4,
  },
  txHash: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0c4a6e",
    marginTop: 4,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    width: "70%",
    backgroundColor: "#10b981",
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
