import React, { useState, useContext } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For star ratings
import { CartContext } from './CartContext'; // Import Cart context for cart actions

const ProductDetailScreen = ({ navigation }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  // Increment product quantity
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Decrement product quantity with a lower bound of 1
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Add product to cart
  const handleAddToCart = () => {
    const product = {
      name: 'Marble & Stone Tiles',
      price: 88.39,
      quantity,
    };
    addToCart(product);
    navigation.navigate('Cart');
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../assets/images/login.jpg")} // Update path to use the /assets/images structure
        style={styles.image}
      />

      {/* Product Details */}
      <View style={styles.detailContainer}>
        <Text style={styles.title}>Marble & Stone Tiles</Text>
        <Text style={styles.price}>₹88.39 / Sq. Ft.</Text>
        
        {/* Star Rating */}
        <View style={styles.ratingContainer}>
          {[...Array(4)].map((_, index) => (
            <Icon key={index} name="star" size={20} color="#FFD700" />
          ))}
          <Icon name="star-o" size={20} color="#FFD700" />
        </View>
        
        <Text style={styles.sku}>SKU: MYT-F-6001200-Code18817L</Text>

        {/* Product Description */}
        <Text style={styles.description}>
          Introducing Marble Vitrified Tile in Cream hue - perfect for adding character to Living Room, Bedroom, Kitchen.
          These tiles are 1600×800 mm in size, and feature a Glossy finish.
        </Text>

        {/* Product Specifications */}
        <View style={styles.specsContainer}>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Tile Size</Text>
            <Text style={styles.specValue}>600×1200mm</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Thickness</Text>
            <Text style={styles.specValue}>8 mm</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Color</Text>
            <Text style={styles.specValue}>Gray</Text>
          </View>

          {/* Layout Images */}
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Layout</Text>
            <View style={styles.layout}>
              <Image source={require("../assets/images/login.jpg")} style={styles.layoutImage} />
              <Image source={require("../assets/images/login.jpg")} style={styles.layoutImage} />
            </View>
          </View>
          {/* Additional Specifications */}
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Application</Text>
            <Text style={styles.specValue}>Living Room, Bedroom, Kitchen</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Finish</Text>
            <Text style={styles.specValue}>Glossy</Text>
          </View>
        </View>

        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.wishlistButton}>
            <Text style={styles.buttonText}>Add to Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// Styles for ProductDetailScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  image: {
    width: '100%',
    height: 200,
  },
  detailContainer: {
    padding: 20,
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  price: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  sku: {
    fontSize: 14,
    color: '#888',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 10,
  },
  specsContainer: {
    marginVertical: 10,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  specLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  specValue: {
    fontSize: 14,
    color: '#fff',
  },
  layout: {
    flexDirection: 'row',
  },
  layoutImage: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    backgroundColor: '#EEDABC',
    padding: 10,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
    color: '#fff',
    marginHorizontal: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  wishlistButton: {
    backgroundColor: '#EEDABC',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  cartButton: {
    backgroundColor: '#EEDABC',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1A1A1A',
  },
});

export default ProductDetailScreen;