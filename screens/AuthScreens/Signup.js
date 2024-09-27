import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { TextInput, Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import * as Yup from 'yup'; // For validation
import { Formik } from 'formik'; // For managing form state

// Theme for react-native-paper components
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0a84ff',
  },
};

// Form validation schema using Yup
const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobileNumber: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  registerAs: Yup.string().required('Role is required'),
  dealerEmail: Yup.string().email('Invalid dealer email').when('registerAs', {
    is: 'salesperson',
    then: Yup.string().required('Dealer email is required for Salesperson role'),
  }),
  terms: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
});

const Signup = ({ navigation }) => {
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  const registerAsOptions = [
    { label: 'Dealer', value: 'dealer', icon: 'store' },
    { label: 'Salesperson', value: 'salesperson', icon: 'account-tie' },
    { label: 'Architect', value: 'architect', icon: 'compass-outline' },
    { label: 'Builder', value: 'builder', icon: 'hammer' },
  ];

  const handleSignup = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      const response = await axios.post('http://your-backend-url/api/auth/register', values);
      Alert.alert('Success', 'User registered successfully');
      resetForm(); // Reset form after successful signup
      navigation.navigate('Login'); // Redirect to Login after registration
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ apiError: error.response.data.message });
      } else {
        setErrors({ apiError: 'Something went wrong, please try again later' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              mobileNumber: '',
              password: '',
              registerAs: '',
              dealerEmail: '',
              terms: false,
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
              <>
                <TextInput
                  label="First Name"
                  mode="outlined"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  error={touched.firstName && errors.firstName}
                  style={styles.input}
                />
                {touched.firstName && errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

                <TextInput
                  label="Last Name"
                  mode="outlined"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  error={touched.lastName && errors.lastName}
                  style={styles.input}
                />
                {touched.lastName && errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

                <TextInput
                  label="Email"
                  mode="outlined"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email && errors.email}
                  style={styles.input}
                />
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <TextInput
                  label="Mobile Number"
                  mode="outlined"
                  keyboardType="phone-pad"
                  value={values.mobileNumber}
                  onChangeText={handleChange('mobileNumber')}
                  onBlur={handleBlur('mobileNumber')}
                  error={touched.mobileNumber && errors.mobileNumber}
                  style={styles.input}
                />
                {touched.mobileNumber && errors.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber}</Text>}

                <TextInput
                  label="Password"
                  mode="outlined"
                  secureTextEntry={!showPassword}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && errors.password}
                  style={styles.input}
                  right={<TextInput.Icon name={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
                />
                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <Text style={styles.label}>Register as:</Text>
                {registerAsOptions.map(option => (
                  <TouchableOpacity
                    key={option.value}
                    style={styles.option}
                    onPress={() => setFieldValue('registerAs', option.value)}
                  >
                    <MaterialCommunityIcons name={option.icon} size={20} />
                    <Text style={styles.optionText}>{option.label}</Text>
                    {values.registerAs === option.value && <MaterialCommunityIcons name="check-circle" size={20} color="green" />}
                  </TouchableOpacity>
                ))}
                {touched.registerAs && errors.registerAs && <Text style={styles.errorText}>{errors.registerAs}</Text>}

                {values.registerAs === 'salesperson' && (
                  <>
                    <TextInput
                      label="Dealer Email"
                      mode="outlined"
                      keyboardType="email-address"
                      value={values.dealerEmail}
                      onChangeText={handleChange('dealerEmail')}
                      onBlur={handleBlur('dealerEmail')}
                      error={touched.dealerEmail && errors.dealerEmail}
                      style={styles.input}
                    />
                    {touched.dealerEmail && errors.dealerEmail && <Text style={styles.errorText}>{errors.dealerEmail}</Text>}
                  </>
                )}

                <View style={styles.checkboxContainer}>
                  <BouncyCheckbox
                    isChecked={values.terms}
                    onPress={() => setFieldValue('terms', !values.terms)}
                    fillColor="#0a84ff"
                  />
                  <Text>I agree to the terms and conditions</Text>
                </View>
                {touched.terms && errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}

                {errors.apiError && <Text style={styles.errorText}>{errors.apiError}</Text>}

                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  style={styles.submitButton}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
  },
});

export default Signup;