import React, { useState } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Text, Pressable, Image, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/colors'; // Ensure this is correctly pointing to your color constants

const Welcome = () => {
  const navigation = useNavigation();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // Error handling before login action
  const handleLogin = () => {
    if (!userId.trim()) {
      Alert.alert('Error', 'Please enter your User ID.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your Password.');
      return;
    }

    // Handle the login functionality (API call or navigation)
    console.log('Login with:', userId, password);
    navigation.navigate("Home"); // Navigating to the Home screen
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View>
        <Image
          source={require("../assets/images/login.jpg")} // Ensure this image path is correct
          style={{
            height: 390,
            width: 390,
            borderRadius: 0,
            top: 0,
            transform: [{ translateX: 0 }, { translateY: 0 }],
          }}
        />
      </View>

      {/* Content */}
      <View style={{ paddingHorizontal: 22, top: -50, width: "100%" }}>
        <Text style={{ fontSize: 30, fontWeight: '800' }}>Welcome!</Text>

        {/* User ID Input */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, marginVertical: 8 }}>User ID</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='User ID'
              placeholderTextColor={COLORS.black}
              style={{ width: "100%" }}
              value={userId}
              onChangeText={setUserId}
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, marginVertical: 8 }}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={{ width: "100%" }}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={styles.iconButton}
            >
              <Ionicons name={isPasswordShown ? "eye-off" : "eye"} size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>

          <Pressable onPress={() => navigation.navigate("ForgotPass")}>
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </Pressable>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Register Section */}
        <View style={styles.registerContainer}>
          <Text style={{ fontSize: 16 }}>Not a Member?</Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.registerLink}>Register Now</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

// Styles for the component
const styles = {
  inputContainer: {
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
    backgroundColor: "#fff", // Optional: Adds contrast with background
  },
  iconButton: {
    position: 'absolute',
    right: 12,
  },
  forgotPassword: {
    marginTop: 7,
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 4,
    color: COLORS.primary, // Set color for better visibility
  },
  loginButton: {
    marginTop: 22,
    width: "100%",
    backgroundColor: COLORS.primary,
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "center",
  },
  registerLink: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
    color: COLORS.primary,
  },
};

export default Welcome;