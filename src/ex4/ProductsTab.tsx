import React from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { TabProps } from "./types";

export function ProductsTab({ navigation }: TabProps<"Products">) {
  // TODO 3: FlatList data={PHONES}; mỗi dòng là <ProductRow phone={item} onPress={...} />
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        >
          <Image
            source={PHONE_COLORS[item.defaultColor].image}
            style={styles.thumb}
            resizeMode="contain"
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  thumb: { width: 55, height: 55, marginRight: 12 },
  title: { fontSize: 14, fontWeight: "500", color: colors.text },
  price: { fontSize: 14, fontWeight: "bold", color: colors.red, marginTop: 4 },
});