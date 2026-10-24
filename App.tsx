// App.tsx
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { PHONES } from "./src/data/phones";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";
import { colors } from "./src/theme";

export default function App() {
  const [selectedEx, setSelectedEx] = useState<number | null>(null);

  // Màn hình Menu chính
  if (selectedEx === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>LAB 06 · NAVIGATION</Text>
        <Text style={styles.subTitle}>Chọn bài tập để xem kết quả:</Text>

        <View style={styles.menu}>
          <TouchableOpacity style={styles.btn} onPress={() => setSelectedEx(1)}>
            <Text style={styles.btnText}>Bài 1: Select Phone (Local)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => setSelectedEx(2)}>
            <Text style={styles.btnText}>Bài 2: Gắn API (MockAPI)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => setSelectedEx(3)}>
            <Text style={styles.btnText}>Bài 3: Bottom Tab Navigation</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => setSelectedEx(4)}>
            <Text style={styles.btnText}>Bài 4: Stack + Tab + Passing Params</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => setSelectedEx(5)}>
            <Text style={styles.btnText}>Bài 5: Drawer Navigation</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Khi đã chọn bài: bọc bên ngoài bằng NavigationIndependentTree + NavigationContainer
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.backBar} onPress={() => setSelectedEx(null)}>
            <Text style={styles.backText}>◀ Quay lại Menu chính</Text>
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            {selectedEx === 1 && <SelectPhoneApp phone={PHONES[0]} />}
            {selectedEx === 2 && <SelectPhoneApi />}
            {selectedEx === 3 && <BottomTabApp />}
            {selectedEx === 4 && <StackTabApp />}
            {selectedEx === 5 && <DrawerApp />}
          </View>
        </View>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", color: colors.navy },
  subTitle: { fontSize: 15, textAlign: "center", color: colors.muted, marginVertical: 12 },
  menu: { gap: 12, marginTop: 16 },
  btn: {
    backgroundColor: colors.blue,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  backBar: {
    backgroundColor: colors.navy,
    paddingVertical: 10,
    paddingHorizontal: 16,
    paddingTop: 45,
  },
  backText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
});