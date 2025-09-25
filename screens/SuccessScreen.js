// screens/SuccessScreen.js
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import * as Animatable from "react-native-animatable";

export default function SuccessScreen({ navigation, route }) {
  const { txHash, flight, hotel, totalAmount } = route.params;

  // Fake blockchain metadata
  const blockNumber = Math.floor(18000000 + Math.random() * 5000);
  const confirmations = Math.floor(8 + Math.random() * 12);
  const gasFee = (0.001 + Math.random() * 0.002).toFixed(4);

  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      style={styles.bg}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Success Illustration */}
        <Animatable.Image
          animation="zoomIn"
          duration={1000}
          source={require("../assets/success.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <Animatable.Text animation="fadeInDown" style={styles.title}>
          🎉 Payment Successful
        </Animatable.Text>
        <Animatable.Text animation="fadeInUp" delay={300} style={styles.subtitle}>
          Your booking has been confirmed on-chain ⛓️
        </Animatable.Text>

        {/* Booking Summary */}
        <Animatable.View animation="fadeInUp" delay={500} style={styles.card}>
          <Text style={styles.cardTitle}>Booking Summary</Text>
          <Text style={styles.detail}>✈ Flight: {flight?.name} (${flight?.price})</Text>
          <Text style={styles.detail}>
            🏨 Hotel: {hotel?.name} (${hotel?.pricePerNight} × {hotel?.days} nights)
          </Text>
          <Text style={styles.detailTotal}>💵 Paid: {totalAmount} USDC</Text>
        </Animatable.View>

        {/* Blockchain Details */}
        {txHash && (
          <Animatable.View animation="fadeInUp" delay={700} style={styles.txCard}>
            <Ionicons name="link-outline" size={22} color="#0369a1" />
            <Text style={styles.txTitle}>Transaction Details</Text>

            <View style={styles.txRow}>
              <Text style={styles.txKey}>Hash:</Text>
              <Text style={styles.txValue}>{txHash}</Text>
            </View>
            <View style={styles.txRow}>
              <Text style={styles.txKey}>Block:</Text>
              <Text style={styles.txValue}>#{blockNumber}</Text>
            </View>
            <View style={styles.txRow}>
              <Text style={styles.txKey}>Confirmations:</Text>
              <Text style={styles.txValue}>{confirmations}</Text>
            </View>
            <View style={styles.txRow}>
              <Text style={styles.txKey}>Gas Fee:</Text>
              <Text style={styles.txValue}>{gasFee} ETH</Text>
            </View>
            <View style={styles.txRow}>
              <Text style={styles.txKey}>Network:</Text>
              <Text style={styles.txValue}>Ethereum Mainnet</Text>
            </View>
          </Animatable.View>
        )}

        {/* Back to Home Button */}
        <Animatable.View animation="pulse" iterationCount="infinite" delay={1200}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
            activeOpacity={0.8}
          >
            <Ionicons name="home-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "75%",
    height: 160,
    marginBottom: 20,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#22c55e",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#e5e7eb",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 10,
  },
  detail: { fontSize: 15, color: "#374151", marginBottom: 6 },
  detailTotal: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16a34a",
    marginTop: 6,
  },
  txCard: {
    width: "100%",
    backgroundColor: "#e0f2fe",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  txTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0369a1",
    marginBottom: 10,
    textAlign: "center",
  },
  txRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  txKey: { fontSize: 14, fontWeight: "500", color: "#374151" },
  txValue: { fontSize: 14, fontWeight: "600", color: "#0c4a6e" },
  button: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: "#2563eb",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: { color: "#fff", fontSize: 17, fontWeight: "600" },
});
