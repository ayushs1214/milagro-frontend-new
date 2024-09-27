import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import data from '../data/data.json'; // Make sure the data.json file is in the correct location
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState(data.products); // Assuming products are fetched from a local JSON file

  return (
    <ScrollView style={styles.container}>
      {/* Header with icons */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Menu pressed')}>
          <Ionicons name="menu" size={24} color="#987952" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#987952" style={styles.search} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Favorite pressed')}>
          <FontAwesome name="heart" size={24} color="#987952" style={styles.fav} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <FontAwesome name="shopping-cart" size={24} color="#987952" style={styles.cart} />
        </TouchableOpacity>
      </View>

      {/* Discount Banner */}
      <View style={styles.bannerContainer}>
        <ImageBackground
          source={require('../assets/images/feature1.png')} // Corrected path
          style={styles.imageBackground}
        >
          <Text style={styles.bannerText}>Discounts up to 15% for all</Text>
        </ImageBackground>
      </View>

      {/* Featured Products Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Featured Product</Text>
        <ScrollView horizontal>
          {/* Assuming you're mapping over the product array */}
          {products.map((product, index) => (
            <TouchableOpacity key={index} style={styles.productContainer}>
              <Image source={require('../assets/images/feature1.png')} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDesigner}>Designed by {product.designer}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bulk Deals and Promotions */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Bulk Deals and Promotions</Text>
        <TouchableOpacity style={styles.bulkDealContainer}>
          <Image style={styles.bulkDealImage} source={require('../assets/images/sale.png')} />
          <View>
            <Text style={styles.bulkDealName}>Semi Glossy Ceramic</Text>
            <Text style={styles.bulkDealCompany}>by Gedhar Trading Company</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')} style={styles.bulkDealContainer}>
          <Image style={styles.bulkDealImage} source={require('../assets/images/sale.png')} />
          <View>
            <Text style={styles.bulkDealName}>Designer Tiles with Aluminium Profiles</Text>
            <Text style={styles.bulkDealCompany}>by Ishika Tiles</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles for HomeScreen component
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111111',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'black',
    justifyContent: 'space-between',
  },
  search: {
    marginRight: 10,
  },
  fav: {
    marginRight: 10,
  },
  cart: {
    marginRight: 25,
  },
  bannerContainer: {
    backgroundColor: '#444',
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  bannerText: {
    color: '#fff',
    fontSize: 18,
  },
  imageBackground: {
    width: '100%',
    height: 155,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 10,
  },
  productContainer: {
    marginRight: 10,
  },
  productImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  productName: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  productDesigner: {
    color: '#aaa',
    fontSize: 14,
  },
  bulkDealContainer: {
    flexDirection: 'row',
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  bulkDealImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  bulkDealName: {
    color: '#fff',
    fontSize: 16,
  },
  bulkDealCompany: {
    color: '#aaa',
    fontSize: 14,
  },
});

export default HomeScreen;