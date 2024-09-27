import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { TextInput, Text, Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'gold',
    accent: 'white',
    text: 'white',
  },
};

const Shippingdeets = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    zipPostal: '',
    streetAddress: '',
    city: '',
    stateProvince: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log('Form data:', formData);

    axios.post('url-daal-yaha', formData)
      .then(response => {
        console.log('Response:', response.data);
        // Handle the response as needed
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <PaperProvider theme={theme}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <View style={styles.stepContainer}>
              <View style={styles.step}>
                <Icon name="check-circle" size={24} color="#f0c14b" />
                <Text style={styles.stepText}>Your bag</Text>
              </View>
              <View style={styles.step}>
                <Icon name="check-circle" size={24} color="#f0c14b" />
                <Text style={styles.stepText}>Shipping</Text>
              </View>
              <View style={styles.step}>
                <Icon name="check-circle" size={24} color="#f0c14b" />
                <Text style={styles.stepText}>Review</Text>
              </View>
            </View>
          </View>
        )}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <Text style={styles.textinput}>First Name</Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            value={formData.firstName}
            onChangeText={(value) => handleInputChange('firstName', value)}
          />

          <Text style={styles.textinput}>Last Name</Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            value={formData.lastName}
            onChangeText={(value) => handleInputChange('lastName', value)}
          />

          <Text style={styles.textinput}>Email Address</Text>
          <TextInput
            keyboardType="email-address"
            mode="outlined"
            style={styles.input}
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />

          <Text style={styles.textinput}>ZIP / Postal</Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            value={formData.zipPostal}
            onChangeText={(value) => handleInputChange('zipPostal', value)}
          />

          <Text style={styles.textinput}>Street Address</Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            value={formData.streetAddress}
            onChangeText={(value) => handleInputChange('streetAddress', value)}
          />

          <Text style={styles.textinput}>City</Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            value={formData.city}
            onChangeText={(value) => handleInputChange('city', value)}
          />

          <Text style={styles.textinput}>State / Province</Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            value={formData.stateProvince}
            onChangeText={(value) => handleInputChange('stateProvince', value)}
          />

          <View style={styles.buttonContainer}>
            <Button mode="text" onPress={() => navigation.navigate('Home')} style={styles.cancelButton}>
              Cancel
            </Button>
            <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
              Next
            </Button>
          </View>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  form: {
    marginTop: 20,
  },
  input: {
    marginBottom: 15,
    height: 50,
    borderWidth: 1,
    borderColor: 'gold',
    backgroundColor: '#ddd',
    borderRadius: 6,
  },
  textinput: {
    marginBottom: 4,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'gold',
    marginRight: 5,
  },
  submitButton: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: 'gold',
  },
  header: {
    padding: 10,
    backgroundColor: '#1e1e1e',
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  step: {
    alignItems: 'center',
  },
  stepText: {
    color: '#fff',
    marginTop: 5,
  },
});

export default Shippingdeets;