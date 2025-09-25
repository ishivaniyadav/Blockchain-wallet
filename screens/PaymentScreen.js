import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import * as Animatable from "react-native-animatable";

export default function PaymentScreen({ navigation, route }) {
  const { flight, hostel } = route.params;
  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedToken, setSelectedToken] = useState("USDC");
  const [txHash, setTxHash] = useState(null);
  const [step, setStep] = useState("start"); // start → wallet → confirm → pending → success

  const fakeWalletAddress = "0xAB3D...9F21";

  // 🟢 Dynamic pricing
  const flightPrice = flight?.price || 0;
  const hostelNights = hostel?.days || 1;
  const hostelPricePerNight = hostel?.pricePerNight || 0;
  const totalHostelCost = hostelPricePerNight * hostelNights;
  const totalAmount = flightPrice + totalHostelCost;

  // Conversion simulation
  const conversionRates = {
    USDC: `${totalAmount} USDC ≈ ${(totalAmount * 0.00052).toFixed(3)} ETH`,
    DAI: `${totalAmount} DAI ≈ ${(totalAmount * 0.00051).toFixed(3)} ETH`,
  };

  const handleConnectWallet = () => {
    setLoading(true);
    setStep("wallet");
    setTimeout(() => {
      setWalletConnected(true);
      setLoading(false);
      setStep("confirm");
    }, 2000);
  };

  const handlePayment = () => {
    setLoading(true);
    setStep("pending");
    setTimeout(() => {
      const hash =
        "0x" + Math.random().toString(16).substring(2, 10) + "ABC12345DEF";
      setTxHash(hash);
      setLoading(false);
      setStep("success");
      navigation.navigate("Success", {
        txHash: hash,
        flight,
        hostel,
        totalAmount,
      });
    }, 3000);
  };

  return (
    <LinearGradient
      colors={["#1e3c72", "#2a5298", "#3a1c71"]}
      style={styles.bg}
    >
      <View style={styles.container}>
        {/* Title */}
        <Animatable.Text animation="fadeInDown" style={styles.title}>
          🔗 Blockchain Payment
        </Animatable.Text>

        {/* Illustration */}
        <Animatable.Image
          animation="fadeIn"
          delay={300}
          source={require("../assets/payment.png")}
          style={styles.illustration}
          resizeMode="contain"
        />

        {/* Wallet Section */}
        <Animatable.View animation="fadeInUp" delay={500} style={styles.card}>
          <Text style={styles.cardTitle}>Wallet</Text>
          {walletConnected ? (
            <View style={styles.walletRow}>
              <MaterialCommunityIcons
                name="wallet"
                size={24}
                color="#16a34a"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.walletText}>{fakeWalletAddress}</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={handleConnectWallet}
              activeOpacity={0.7}
            >
              {loading && step === "wallet" ? (
                <ActivityIndicator color="#16a34a" />
              ) : (
                <Text style={styles.buttonOutlineText}>Connect Wallet</Text>
              )}
            </TouchableOpacity>
          )}
        </Animatable.View>

        {/* Payment Summary */}
        <Animatable.View animation="fadeInUp" delay={600} style={styles.card}>
          <Text style={styles.cardTitle}>Payment Summary</Text>
          <Text style={styles.detailText}>
            ✈ Flight: {flight?.name} (${flightPrice})
          </Text>
          <Text style={styles.detailText}>
            🏨 Hostel: {hostel?.name} (${hostelPricePerNight} × {hostelNights} =
            ${totalHostelCost})
          </Text>
          <Text style={styles.detailTotal}>
            💵 Total: ${totalAmount} {selectedToken}
          </Text>
          <Text style={styles.gasText}>
            {conversionRates[selectedToken]}
            {"\n"}+ Estimated Gas: 0.001 ETH
          </Text>

          {/* Token Selector */}
          <View style={styles.tokenRow}>
            {["USDC", "DAI"].map((token) => (
              <TouchableOpacity
                key={token}
                style={[
                  styles.tokenButton,
                  selectedToken === token && styles.tokenButtonActive,
                ]}
                onPress={() => setSelectedToken(token)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tokenText,
                    selectedToken === token && styles.tokenTextActive,
                  ]}
                >
                  {token}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animatable.View>

        {/* Confirm Button */}
        {walletConnected && step === "confirm" && !loading && (
          <Animatable.View animation="pulse" iterationCount="infinite">
            <TouchableOpacity
              style={styles.payButton}
              onPress={handlePayment}
              activeOpacity={0.8}
            >
              <Ionicons name="lock-closed" size={20} color="#fff" />
              <Text style={styles.payButtonText}>Confirm Payment</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}

        {/* Loading / Pending */}
        {loading && step === "pending" && (
          <Animatable.View animation="fadeIn" style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#fbbf24" />
            <Text style={styles.loadingText}>Transaction Pending...</Text>
            <Text style={styles.loadingSubText}>
              Please wait while we confirm on-chain ⛓️
            </Text>
          </Animatable.View>
        )}

        {/* Tx Hash */}
        {txHash && step === "success" && (
          <Animatable.View animation="fadeInUp" style={styles.txCard}>
            <Text style={styles.txLabel}>✅ Transaction Successful</Text>
            <Text style={styles.txHash}>{txHash}</Text>
          </Animatable.View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    marginVertical: 16,
    textAlign: "center",
  },
  illustration: {
    width: "85%",
    height: 120,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
  },
  detailText: { fontSize: 15, color: "#374151", marginBottom: 6 },
  detailTotal: { fontSize: 18, fontWeight: "700", marginTop: 6, color: "#111" },
  gasText: { fontSize: 13, color: "#6b7280", marginTop: 8, fontStyle: "italic" },
  buttonOutline: {
    borderColor: "#16a34a",
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonOutlineText: { color: "#16a34a", fontSize: 16, fontWeight: "600" },
  walletRow: { flexDirection: "row", alignItems: "center" },
  walletText: { fontSize: 16, fontWeight: "600", color: "#065f46" },
  tokenRow: { flexDirection: "row", marginTop: 16, justifyContent: "center" },
  tokenButton: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  tokenButtonActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
    transform: [{ scale: 1.05 }],
  },
  tokenText: { fontSize: 15, fontWeight: "600", color: "#374151" },
  tokenTextActive: { color: "#fff" },
  payButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
    shadowColor: "#2563eb",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  payButtonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  loaderContainer: { marginTop: 20, alignItems: "center" },
  loadingText: { fontSize: 16, fontWeight: "600", color: "#fff", marginTop: 12 },
  loadingSubText: { fontSize: 13, color: "#e0e7ff", marginTop: 4 },
  txCard: {
    backgroundColor: "#dcfce7",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  txLabel: { fontSize: 15, fontWeight: "600", color: "#166534", marginBottom: 8 },
  txHash: { fontSize: 14, fontWeight: "700", color: "#065f46" },
});
