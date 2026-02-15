import { THEME } from "@/lib/theme";
import { Tabs } from "expo-router";
import { Home, Users, Bell, Settings, Cake } from "lucide-react-native";
import { cssInterop, useColorScheme } from "nativewind";

// Enable className styling for icons
cssInterop(Home, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});
cssInterop(Users, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});
cssInterop(Bell, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});
cssInterop(Settings, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        animation: 'shift',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? THEME.dark.background : THEME.light.background,
          borderTopColor: isDark ?  THEME.dark.border : THEME.light.border,
        },
        tabBarActiveTintColor: isDark ? "#3b82f6" : "#3b82f6",
        tabBarInactiveTintColor: isDark ? "#94a3b8" : "#64748b",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Home
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="members"
        options={{
          title: "Members",
          tabBarIcon: ({ focused }) => (
            <Users
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="birthdays"
        options={{
          title: "Birthdays",
          tabBarIcon: ({ focused }) => (
            <Cake
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <Settings
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
