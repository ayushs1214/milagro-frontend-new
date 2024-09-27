import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';

const ForgotPass = ({ navigation }) => {
  const [email, setEmail] = useState('');

  // Handle password reset logic (placeholder)
  const handlePasswordReset = () => {
    if (!email) {
      Alert.alert('Invalid Input', 'Please enter a valid email or user ID');
      return;
    }
    // You can add backend logic here to handle password reset requests
    console.log('Password reset request sent for:', email);
    navigation.navigate('ForgotOtp');  // Navigate to OTP screen after request
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View>
        <Image
          source={require('../assets/login.jpg')}  // Ensure the correct path to the image
          style={styles.image}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Forgot Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your User ID or Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"  // Optimized input for email addresses
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
          <Text style={styles.buttonText}>Send Request</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles for the ForgotPass screen
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',  // Light background color for better contrast
  },
  image: {
    width: 390,  // Adjust width as per your layout
    height: 390,
    borderRadius: 0,
    resizeMode: 'cover',  // Ensures image covers the space correctly
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',  // Slightly more opaque background for contrast
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    fontSize: 23,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 16,
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 4,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPass;