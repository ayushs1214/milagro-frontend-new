import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, ScrollView } from 'react-native';

const CodeScreen = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef([]);

  // Handle code input change and navigate to the next input field
  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Automatically move to next input
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    } else if (index === 3) {
      inputs.current[index].blur();
      Keyboard.dismiss();
    }

    // Automatically log the code once it's fully entered
    if (newCode.join('').length === 4) {
      console.log('Entered Code:', newCode.join(''));
    }
  };

  // Handle "Next" button press
  const handleNextPress = () => {
    if (code.join('').length === 4) {
      Alert.alert('Code Entered', `You entered: ${code.join('')}`);
      // Add backend logic here, for example sending the code to the server
      navigation.navigate("CompanyDeets");  // Example of navigation after code submission
    } else {
      Alert.alert('Invalid Code', 'Please enter a 4-digit code.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.header}>Enter Confirmation Code</Text>
        <Text style={styles.subHeader}>A 4-digit code was sent to{'\n'}lucasscott3@email.com</Text>

        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(input) => (inputs.current[index] = input)}
              style={styles.codeInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleCodeChange(text, index)}
              value={digit}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Welcome")}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// Styles for CodeScreen.js
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 30,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    margin: 4,
    backgroundColor: '#F7F7F7',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  backButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    alignItems: 'center',
    marginRight: 8,
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CodeScreen;