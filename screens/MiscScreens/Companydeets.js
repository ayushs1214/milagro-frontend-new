import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { TextInput, Text, Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0a84ff',
  },
};

const CompanyDeets = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [countryList, setCountryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    companyName: '',
    companyGST: '',
    companyPAN: '',
    streetAddress: '',
    city: '',
    stateProvince: '',
    zipPostal: '',
  });

  // Fetch countries when the component loads
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data
          .map((country) => ({
            label: country.name.common,
            value: country.name.common,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setCountryList(countries);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching country list:', error);
        setLoading(false);
        Alert.alert('Error', 'Unable to load country list.');
      }
    };
    fetchCountries();
  }, []);

  // Handle form input changes
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      const data = {
        ...formData,
        country: selectedCountry,
      };

      axios.post('url-daal-yaha', data)
        .then(response => {
          console.log('Response:', response.data);
          Alert.alert('Success', 'Company details submitted successfully.');
          navigation.navigate('NextScreen');  // Adjust the navigation target
        })
        .catch(error => {
          console.error('Error:', error);
          Alert.alert('Error', 'Failed to submit the form.');
        });
    }
  };

  // Validate form fields
  const validateForm = () => {
    const { companyName, companyGST, companyPAN, streetAddress, city, stateProvince, zipPostal } = formData;
    if (!companyName || !companyGST || !companyPAN || !streetAddress || !city || !stateProvince || !zipPostal) {
      Alert.alert('Invalid Input', 'All fields are required.');
      return false;
    }
    return true;
  };

  // Handle form cancellation
  const handleCancel = () => {
    Alert.alert('Cancel', 'Form cancelled.');
    navigation.goBack();
  };

  if (loading) {
    return (
      <PaperProvider theme={theme}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0a84ff" />
        </View>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.view}>
          <Text style={styles.heading}>Company Details</Text>
          <Text>Use a permanent address where you can receive product.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.textinput}>Company Name</Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            value={formData.companyName}
            onChangeText={(value) => handleInputChange('companyName', value)}
          />

          <Text style={styles.textinput}>Company GST Number</Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            value={formData.companyGST}
            onChangeText={(value) => handleInputChange('companyGST', value)}
          />

          <Text style={styles.textinput}>Company PAN Number</Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            value={formData.companyPAN}
            onChangeText={(value) => handleInputChange('companyPAN', value)}
          />

          <Text style={styles.textinput}>Country / Region</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              value={selectedCountry}
              onValueChange={(value) => setSelectedCountry(value)}
              items={countryList}
              style={{
                inputAndroid: {
                  color: 'black',
                  padding: 10,
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 5,
                },
                inputIOS: {
                  color: 'black',
                  padding: 10,
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 5,
                },
              }}
            />
          </View>

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

          <Text style={styles.textinput}>ZIP / Postal</Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            value={formData.zipPostal}
            onChangeText={(value) => handleInputChange('zipPostal', value)}
          />

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button mode="text" onPress={handleCancel} style={styles.cancelButton}>
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

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 65,
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
    marginBottom: 15,
    height: 50,
  },
  textinput: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  pickerContainer: {
    flexDirection: 'column',
    height: 50,
    marginBottom: 15,
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
});

export default CompanyDeets;