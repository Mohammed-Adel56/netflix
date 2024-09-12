import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const trans = setTimeout(() => {
      navigation.replace("Layout");
    }, 5000);
    return () => clearTimeout(trans);
  }, []);
  return (
    <View style={styles.contianer}>
      <Text style={{ color: "red", fontSize: 50 }}>NETFLIX</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151515",
  },
});
