import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Checkbox, Text, DefaultTheme, Provider as PaperProvider, IconButton } from 'react-native-paper';
import PasswordChangeSuccessModal from './modalpassword';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0a84ff',
  },
};

const Changepassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle password change submission
  const handleSubmitPress = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
      try {
        await submitPasswordChange();  // Simulated backend request
        setModalVisible(true);  // Show success modal
      } catch (error) {
        Alert.alert('Error', 'Failed to change the password. Please try again.');
      }
    }
  };

  // Simulated backend API call to change password
  const submitPasswordChange = async () => {
    // Replace this with your actual API request logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Password changed successfully');
      }, 1000);
    });
  };

  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleModalDismiss = () => setModalVisible(false);

  return (
    <PaperProvider theme={theme}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.view}>
          <Text style={styles.heading}>Change Your Password</Text>
        </View>

        <View style={styles.form}>
          {/* New Password Field */}
          <Text style={styles.textinput}>New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              secureTextEntry={!showNewPassword}
              mode="flat"
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <IconButton
              icon={showNewPassword ? 'eye' : 'eye-off'}
              onPress={toggleShowNewPassword}
              style={styles.iconButton}
            />
          </View>

          {/* Confirm Password Field */}
          <Text style={styles.textinput}>Re-type Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              secureTextEntry={!showConfirmPassword}
              mode="flat"
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <IconButton
              icon={showConfirmPassword ? 'eye' : 'eye-off'}
              onPress={toggleShowConfirmPassword}
              style={styles.iconButton}
            />
          </View>

          {/* Error Message for Password Mismatch */}
          {passwordMatchError && (
            <Text style={styles.errorText}>Passwords do not match. Please try again.</Text>
          )}

          {/* Terms and Conditions Checkbox */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => setChecked(!checked)}
            />
            <Text style={styles.tnc}>
              I’ve read and agree with the <Text style={styles.link}>Terms and Conditions</Text> and the{' '}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View>

          {/* Submit and Cancel Buttons */}
          <View style={styles.buttonContainer}>
            <Button mode="text" onPress={() => console.log('Cancel button pressed')} style={styles.cancelButton}>
              Cancel
            </Button>
            <Button mode="contained" onPress={handleSubmitPress} style={styles.submitButton} disabled={!checked}>
              Submit
            </Button>
          </View>
        </View>

        {/* Success Modal */}
        <PasswordChangeSuccessModal visible={modalVisible} onDismiss={handleModalDismiss} />
      </ScrollView>
    </PaperProvider>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 65,
  },
  view: {
    marginTop: 40,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  form: {
    marginTop: 20,
  },
  input: {
    marginTop: 15,
    marginBottom: 15,
    height: 43,
    flex: 1,
    backgroundColor: 'white',
  },
  textinput: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    height: 45,
    borderWidth: 0.6,
    borderRadius: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  link: {
    color: '#0a84ff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButton: {
    flex: 1,
    borderRadius: 5,
  },
  tnc: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  iconButton: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Changepassword;