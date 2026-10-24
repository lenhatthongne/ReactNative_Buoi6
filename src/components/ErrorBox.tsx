import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../theme";

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.center}>
      <Text style={styles.err}>{message}</Text>
      <TouchableOpacity style={styles.btn} onPress={onRetry}>
        <Text style={styles.btnText}>THỬ LẠI</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  err: { color: colors.red, fontSize: 16, textAlign: "center", marginBottom: 16 },
  btn: { backgroundColor: colors.navy, paddingVertical: 10, paddingHorizontal: 24, borderRadius: 6 },
  btnText: { color: "#fff", fontWeight: "bold" },
});