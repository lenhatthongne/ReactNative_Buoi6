import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";

type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

// tên icon: [khi chọn, khi không chọn]
const ICONS: Record<
  keyof TabParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

function HomeTab() {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <View style={s.card}>
          <Image
            source={PHONE_COLORS[item.defaultColor].image}
            style={s.cardThumb}
            resizeMode="contain"
          />
          <View style={{ flex: 1 }}>
            <Text style={s.cardTitle}>{item.name.split(" - ")[0]}</Text>
            <Text style={s.cardPrice}>{formatPrice(item.price)}</Text>
          </View>
        </View>
      )}
    />
  );
}

// TODO 1: SearchTab
function SearchTab() {
  const [keyword, setKeyword] = useState("");

  const filtered = useMemo(() => {
    if (!keyword.trim()) return PHONES;
    return PHONES.filter((p) =>
      p.name.toLowerCase().includes(keyword.toLowerCase().trim())
    );
  }, [keyword]);

  return (
    <View style={s.container}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa..."
        style={s.input}
      />
      {filtered.length === 0 ? (
        <Text style={s.emptyText}>Không có kết quả cho “{keyword}”</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ paddingVertical: 12, gap: 10 }}
          renderItem={({ item }) => (
            <View style={s.card}>
              <Text style={s.cardTitle}>{item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

// TODO 2: ProfileTab
function ProfileTab() {
  return (
    <View style={s.profileCenter}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>T</Text>
      </View>
      <Text style={s.profileName}>Lê Nhật Thông</Text>
      <Text style={s.profileEmail}>22003295@student.edu.vn</Text>
    </View>
  );
}

// TODO 3: export function BottomTabApp()
export function BottomTabApp() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitleAlign: "center",
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.muted,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={ICONS[route.name][focused ? 0 : 1]}
              size={size}
              color={color}
            />
          ),
        })}
      >
        <Tab.Screen name="Home" component={HomeTab} options={{ title: "Trang chủ" }} />
        <Tab.Screen name="Search" component={SearchTab} options={{ title: "Tìm kiếm" }} />
        <Tab.Screen name="Profile" component={ProfileTab} options={{ title: "Cá nhân" }} />
      </Tab.Navigator>

  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  emptyText: { marginTop: 24, textAlign: "center", color: colors.muted },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    padding: 12,
  },
  cardThumb: { width: 48, height: 48, marginRight: 12 },
  cardTitle: { fontSize: 15, fontWeight: "500", color: colors.text },
  cardPrice: { fontSize: 13, color: colors.red, marginTop: 4, fontWeight: "bold" },
  profileCenter: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: { fontSize: 36, color: "#fff", fontWeight: "bold" },
  profileName: { fontSize: 20, fontWeight: "bold", color: colors.text },
  profileEmail: { fontSize: 14, color: colors.muted, marginTop: 4 },
});