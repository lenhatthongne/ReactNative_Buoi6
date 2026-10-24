import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { ColorKey, Phone } from "../types";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { SelectPhoneScreenProps } from "./SelectPhoneApp";

type Props = SelectPhoneScreenProps<"ChooseColor"> & { phone: Phone };

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - ");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>
          {/* TODO 3: CHỈ KHI đã chọn màu (picked khác undefined) hiện thêm 3 dòng dưới */}
          {picked !== undefined && (
            <>
              <Text style={styles.detail}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.detail}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.priceBold}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>

        {/* TODO 4: nút "XONG": nền colors.blue, bo góc 4, chữ trắng đậm */}
        <Pressable
          style={styles.doneBtn}
          onPress={() =>
            navigation.navigate({
              name: "Product",
              params: { color: picked },
              merge: true,
            })
          }
        >
          <Text style={styles.doneBtnText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
  },
  thumb: {
    width: 100,
    height: 120,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
    justifyContent: "space-between",
  },
  small: {
    fontSize: 14,
    color: colors.text,
  },
  detail: {
    fontSize: 13,
    color: colors.text,
  },
  bold: {
    fontWeight: "bold",
  },
  priceBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  body: {
    flex: 1,
    backgroundColor: colors.grey,
    padding: 16,
    justifyContent: "space-between",
  },
  hint: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 10,
  },
  swatches: {
    alignItems: "center",
    gap: 14,
  },
  swatch: {
    width: 75,
    height: 75,
    elevation: 3,
  },
  swatchOn: {
    borderWidth: 2,
    borderColor: "#fff",
  },
  doneBtn: {
    backgroundColor: colors.blue,
    borderRadius: 4,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  doneBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});