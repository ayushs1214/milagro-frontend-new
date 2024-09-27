import React from 'react';  // Make sure React is imported
import { StyleSheet, View } from "react-native";
import Home from "../screens/ProductScreens/Home"; // Assuming Home is your main screen

export default function Page() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});