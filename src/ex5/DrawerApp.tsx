import React, { useState, createContext, useContext } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

// TODO 3 (nâng cao): đưa notify/dark lên Context để chế độ tối đổi nền cả màn Home và Profile
const ThemeContext = createContext<{ dark: boolean; setDark: (v: boolean) => void }>({
  dark: false,
  setDark: () => {},
});

function HomeScreen() {
  const { dark } = useContext(ThemeContext);
  return (
    <View style={[s.center, dark && s.bgDark]}>
      <Text style={[s.big, dark && s.textWhite]}>Xin chào 👋</Text>
    </View>
  );
}

function ProfileScreen() {
  const { dark } = useContext(ThemeContext);
  return (
    <View style={[s.center, dark && s.bgDark]}>
      <View style={s.avatar}><Text style={s.avatarText}>NA</Text></View>
      <Text style={[s.big, dark && s.textWhite]}>Nguyễn Văn An</Text>
      <Text style={[s.muted, dark && s.textWhite]}>an.nguyen@example.com</Text>
    </View>
  );
}

// TODO 1: SettingsScreen — 2 state: notify và dark
function SettingsScreen() {
  const { dark, setDark } = useContext(ThemeContext);
  const [notify, setNotify] = useState(true);

  return (
    <View style={[s.settingsContainer, dark && s.bgDark]}>
      <View style={s.settingRow}>
        <Text style={[s.settingLabel, dark && s.textWhite]}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>

      <View style={s.settingRow}>
        <Text style={[s.settingLabel, dark && s.textWhite]}>Giao diện tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>

      <Text style={[s.statusText, dark && s.textWhite]}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

// TODO 2: export function DrawerApp()
export function DrawerApp() {
  const [dark, setDark] = useState(false);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <Drawer.Navigator
        screenOptions={{
          drawerActiveTintColor: colors.red,
          drawerInactiveTintColor: colors.muted,
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Trang chủ",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Hồ sơ",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Cài đặt",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </ThemeContext.Provider>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  big: { fontSize: 22, fontWeight: "bold", color: colors.text },
  muted: { fontSize: 14, color: colors.muted, marginTop: 4 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: { fontSize: 28, color: "#fff", fontWeight: "bold" },
  settingsContainer: { flex: 1, padding: 20, backgroundColor: "#fff" },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  settingLabel: { fontSize: 16, color: colors.text },
  statusText: { marginTop: 24, fontSize: 14, color: colors.muted, textAlign: "center" },
  bgDark: { backgroundColor: "#1e1e1e" },
  textWhite: { color: "#ffffff" },
});