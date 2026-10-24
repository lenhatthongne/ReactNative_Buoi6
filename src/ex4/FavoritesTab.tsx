import React from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";
import { TabProps } from "./types";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  // TODO 8: lấy ids từ useFavorites(); lọc PHONES theo ids; danh sách rỗng → "Chưa có sản phẩm nào được lưu."
  const { ids } = useFavorites();
  const favList = PHONES.filter((p) => ids.includes(p.id));

  if (favList.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favList}
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
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: { fontSize: 15, color: colors.muted },
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