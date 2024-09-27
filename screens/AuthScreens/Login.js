import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { TextInput, Button, Text, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import axios from 'axios';

// Custom theme to apply consistent colors
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#987952', // Brand color
  },
};

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Basic email validation
  const validateEmail = (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  // Handle login functionality (Placeholder for backend integration)
  const handleLogin = async () => {
    let newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response.data.success) {
        // Navigate to the home screen on successful login
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.view}>
            <Text style={styles.heading}>Login</Text>
            <Text>Welcome back! Please enter your credentials.</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              mode="outlined"
              style={[styles.input, errors.email && styles.errorInput]}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors({ ...errors, email: null });
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <Text style={styles.label}>Password</Text>
            <TextInput
              mode="outlined"
              style={[styles.input, errors.password && styles.errorInput]}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors({ ...errors, password: null });
              }}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            {/* Sign Up Redirection */}
            <View style={styles.signupContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  view: {
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  form: {
    marginTop: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  forgotPassword: {
    color: '#987952',
    textAlign: 'right',
    marginBottom: 20,
  },
  loginButton: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  signupContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#987952',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Login;