import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Support = () => {
  const handleChatPress = () => {
    // Placeholder for chat functionality or backend integration
    Alert.alert('Chat', 'Chat functionality coming soon!');
  };

  const handleTextPress = () => {
    Linking.openURL('sms:8003092622').catch(err => {
      Alert.alert('Error', 'Unable to send SMS');
      console.error('Error opening SMS:', err);
    });
  };

  const handleLinkPress = (url) => {
    Linking.openURL(url).catch(err => {
      Alert.alert('Error', 'Unable to open link');
      console.error('Error opening link:', err);
    });
  };

  return (
    <LinearGradient colors={['#575757', '#000000']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>CONTACT US</Text>
        </View>

        {/* Chat Section */}
        <View style={styles.section}>
          <Image source={require('../assets/images/contact-icon.png')} style={styles.icon} />
          <Text style={styles.description}>
            Need an ASAP answer? Contact us via chat, 24/7! For existing orders, please call us.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleChatPress}>
            <Text style={styles.buttonText}>CHAT WITH US</Text>
          </TouchableOpacity>
        </View>

        {/* Text Section */}
        <View style={styles.section}>
          <Image source={require('../assets/images/text-icon.png')} style={styles.icon} />
          <Text style={styles.description}>
            You can text us at 800-309-2622 — Please allow the system to acknowledge a greeting before providing your details.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleTextPress}>
            <Text style={styles.buttonText}>TEXT US</Text>
          </TouchableOpacity>
        </View>

        {/* Social Section */}
        <View style={styles.section}>
          <Image source={require('../assets/images/social-icon.png')} style={styles.icon} />
          <Text style={styles.description}>
            Send us a direct message on <Text style={styles.link} onPress={() => handleLinkPress('https://facebook.com')}>Facebook</Text> or follow us on <Text style={styles.link} onPress={() => handleLinkPress('https://twitter.com')}>Twitter</Text>.
          </Text>
        </View>

        {/* Footer Links */}
        <View style={styles.footer}>
          <Text style={styles.footerLink} onPress={() => handleLinkPress('https://example.com/about')}>About</Text>
          <Text style={styles.footerLink} onPress={() => handleLinkPress('https://example.com/contact')}>Contact</Text>
          <Text style={styles.footerLink} onPress={() => handleLinkPress('https://example.com/blog')}>Blog</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '200',
  },
  section: {
    marginVertical: 25,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  description: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    color: '#00f',
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingVertical: 20,
  },
  footerLink: {
    color: '#987952',
    fontSize: 16,
  },
});

export default Support;