import { StyleSheet, Text, View } from "react-native";
import Home from "./Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Search from "./Search";
export default function Layout() {
  const Tap = createBottomTabNavigator();
  return (
    <Tap.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          }
          if (route.name === "Search") {
            iconName = focused ? "search-circle" : "search";
          }

          // Return the icon component
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#16151A",
          marginBottom: 3,
          borderColor: "#16151A",
        },
      })}
    >
      <Tap.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tap.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
    </Tap.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
