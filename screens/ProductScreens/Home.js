import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../ProductScreens/HomeScreen';   // Correct path
import Support from '../OrderScreens/Support';            // Correct path
import Categories from '../ProductScreens/Categories';    // Correct path

// Create Tab Navigator
const Tab = createBottomTabNavigator();

const Profile = () => (
  <View style={styles.profileContainer}>
    <Text style={styles.profileText}>Hello</Text>
  </View>
);

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#987952',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={25} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Categories" 
        component={Categories} 
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="category" size={25} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Support" 
        component={Support} 
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="message" size={25} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={25} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Home;
