import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { useFavorites } from "./FavoritesContext";
import { RootProps } from "./types";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  // TODO 4: lấy id rồi tìm phone trong PHONES
  const { id } = route.params;
  const phone = PHONES.find((x) => x.id === id);
  const { has, toggle } = useFavorites();

  // TODO 5: không tìm thấy → "Không tìm thấy sản phẩm #id"
  if (!phone) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const isFav = has(phone.id);

  return (
    <SafeAreaView style={styles.container}>
      {/* TODO 6: hiển thị ảnh (màu mặc định), tên, sao, giá, nhà cung cấp */}
      <Image
        source={PHONE_COLORS[phone.defaultColor].image}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{phone.name}</Text>
        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.supplier}>Nhà cung cấp: {phone.supplier}</Text>
        </View>
        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
      </View>

      {/* TODO 7: nút "♡ Lưu vào yêu thích" / "♥ Đã lưu" → toggle(phone.id) */}
      <TouchableOpacity
        style={[styles.favBtn, isFav && styles.favBtnActive]}
        onPress={() => toggle(phone.id)}
      >
        <Text style={[styles.favBtnText, isFav && styles.favBtnTextActive]}>
          {isFav ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, justifyContent: "space-between" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  notFound: { fontSize: 16, color: colors.red },
  image: { width: "100%", height: 300 },
  content: { marginTop: 12 },
  title: { fontSize: 18, fontWeight: "bold", color: colors.text },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 8 },
  supplier: { fontSize: 13, color: colors.muted },
  price: { fontSize: 20, fontWeight: "bold", color: colors.red },
  favBtn: {
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
  },
  favBtnActive: { backgroundColor: colors.red },
  favBtnText: { color: colors.red, fontSize: 16, fontWeight: "bold" },
  favBtnTextActive: { color: "#fff" },
});