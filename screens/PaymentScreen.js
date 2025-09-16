// screens/PaymentScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentScreen({ navigation, route }) {
  const { flight, hostel } = route.params;
  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedToken, setSelectedToken] = useState("USDC");
  const [txHash, setTxHash] = useState(null);

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
    setTimeout(() => {
      setWalletConnected(true);
      setLoading(false);
    }, 1500);
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      const hash =
        "0x" + Math.random().toString(16).substring(2, 10) + "ABC12345DEF";
      setTxHash(hash);
      setLoading(false);
      navigation.navigate("Success", {
        txHash: hash,
        flight,
        hostel,
        totalAmount,
      });
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔗 Blockchain Payment</Text>

      {/* Illustration */}
      <Image
        source={require("../assets/payment.png")}
        style={styles.illustration}
        resizeMode="contain"
      />

      {/* Wallet Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Wallet</Text>
        {walletConnected ? (
          <View style={styles.walletRow}>
            <Image
              source={require("../assets/wallet.png")}
              style={{ width: 28, height: 28, marginRight: 8 }}
            />
            <Text style={styles.walletText}>{fakeWalletAddress}</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={handleConnectWallet}
          >
            {loading ? (
              <ActivityIndicator color="#16a34a" />
            ) : (
              <Text style={styles.buttonOutlineText}>Connect Wallet</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Payment Summary */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment Summary</Text>
        <Text style={styles.detailText}>
          ✈ Flight: {flight?.name} (${flightPrice})
        </Text>
        <Text style={styles.detailText}>
          🏨 Hostel: {hostel?.name} (${hostelPricePerNight} × {hostelNights} nights = ${totalHostelCost})
        </Text>
        <Text style={styles.detailTotal}>
          💵 Total: ${totalAmount} {selectedToken}
        </Text>
        <Text style={styles.gasText}>
          {conversionRates[selectedToken]}
          {"\n"}+ Estimated Gas: 0.001 ETH
        </Text>

        {/* Token selector */}
        <View style={styles.tokenRow}>
          {["USDC", "DAI"].map((token) => (
            <TouchableOpacity
              key={token}
              style={[
                styles.tokenButton,
                selectedToken === token && styles.tokenButtonActive,
              ]}
              onPress={() => setSelectedToken(token)}
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
      </View>

      {/* Pay Button */}
      {walletConnected && !loading && (
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Ionicons name="lock-closed" size={20} color="#fff" />
          <Text style={styles.payButtonText}>Confirm Payment</Text>
        </TouchableOpacity>
      )}

      {/* Loading */}
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Transaction Pending...</Text>
        </View>
      )}

      {/* Tx Hash */}
      {txHash && (
        <View style={styles.txCard}>
          <Text style={styles.txLabel}>Transaction Hash</Text>
          <Text style={styles.txHash}>{txHash}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1e3a8a",
    textAlign: "center",
    marginVertical: 10,
  },
  illustration: {
    width: "100%",
    height: 140,
    marginBottom: 15,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10, color: "#111827" },
  detailText: { fontSize: 16, color: "#374151", marginBottom: 6 },
  detailTotal: { fontSize: 18, fontWeight: "700", color: "#111827", marginTop: 6 },
  gasText: { fontSize: 14, color: "#6b7280", marginTop: 6, fontStyle: "italic" },
  buttonOutline: {
    borderColor: "#16a34a",
    borderWidth: 1.5,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutlineText: { color: "#16a34a", fontSize: 16, fontWeight: "600" },
  walletRow: { flexDirection: "row", alignItems: "center" },
  walletText: { fontSize: 16, fontWeight: "500", color: "#065f46" },
  tokenRow: { flexDirection: "row", marginTop: 12, gap: 10 },
  tokenButton: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  tokenButtonActive: { backgroundColor: "#2563eb", borderColor: "#2563eb" },
  tokenText: { fontSize: 14, color: "#374151" },
  tokenTextActive: { color: "#fff", fontWeight: "600" },
  payButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    gap: 8,
  },
  payButtonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  loaderContainer: { marginTop: 20, alignItems: "center" },
  loadingText: { marginTop: 12, fontSize: 16, color: "#374151", fontWeight: "500" },
  txCard: {
    backgroundColor: "#e0f2fe",
    borderRadius: 12,
    padding: 12,
    marginTop: 20,
  },
  txLabel: { fontSize: 14, color: "#0369a1", marginBottom: 4 },
  txHash: { fontSize: 14, fontWeight: "600", color: "#0c4a6e" },
});
