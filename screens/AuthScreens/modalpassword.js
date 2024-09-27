import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Modal, Portal, Button, Text, IconButton } from 'react-native-paper';

// Component for displaying success modal after password change
const PasswordChangeSuccessModal = ({ visible, onDismiss }) => {

  // Function to handle dismiss action with error handling
  const handleDismiss = () => {
    try {
      onDismiss();
    } catch (error) {
      console.error('Error dismissing modal:', error);
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={handleDismiss} contentContainerStyle={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.content}>
          <IconButton icon="check-circle" iconColor="#4CAF50" size={60} />
          <Text style={styles.successText}>Password Change Successful!</Text>
          <Button mode="contained" style={styles.button} onPress={handleDismiss}>
            Go back to Login page
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

// Styles for the modal component
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    elevation: 5,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1, // Ensures scrollability if needed in the future
  },
  successText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 50,
    marginTop: 10,
  },
});

export default PasswordChangeSuccessModal;