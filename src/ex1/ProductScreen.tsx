import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";
import { SelectPhoneScreenProps } from "./SelectPhoneApp";

type Props = SelectPhoneScreenProps<"Product"> & { phone: Phone };

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image source={PHONE_COLORS[shown].image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.badgeQ}>
            <Text style={styles.badgeQText}>?</Text>
          </View>
        </View>

        {/* TODO 1: nút viền xám, bo góc 6, chữ "4 MÀU-CHỌN MÀU"; nếu đã chọn màu (picked) thì là "4 MÀU-CHỌN LOẠI" */}
        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseBtnText}>
            {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={styles.arrowIcon}>❯</Text>
        </Pressable>
      </View>

      {/* TODO 2: nút "CHỌN MUA": nền colors.red, bo góc 6, chữ trắng đậm, canh giữa, nằm SÁT ĐÁY màn hình */}
      <Pressable
        style={styles.buyBtn}
        onPress={() =>
          Alert.alert("Đặt hàng", `Bạn đã chọn mua phiên bản màu ${PHONE_COLORS[shown].label}`)
        }
      >
        <Text style={styles.buyBtnText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 16,
    justifyContent: "space-between",
  },
  imageWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    maxHeight: 340,
  },
  info: {
    width: "100%",
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  review: {
    fontSize: 14,
    color: colors.muted,
    marginLeft: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginRight: 16,
  },
  oldPrice: {
    fontSize: 14,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  badge: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.red,
  },
  badgeQ: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  badgeQText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  chooseBtn: {
    height: 42,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    position: "relative",
  },
  chooseBtnText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
  },
  arrowIcon: {
    position: "absolute",
    right: 12,
    fontSize: 14,
    color: colors.muted,
  },
  buyBtn: {
    backgroundColor: colors.red,
    borderRadius: 6,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  buyBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});