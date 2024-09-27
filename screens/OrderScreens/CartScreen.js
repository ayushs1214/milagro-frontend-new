import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { CartContext } from './CartContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const CartScreen = ({ navigation }) => {
  const { cart, incrementQuantity, decrementQuantity, emptyCart } = useContext(CartContext);

  // Helper function to calculate total cart value
  const calculateTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  // Handle empty cart action with a confirmation alert
  const handleEmptyCart = () => {
    Alert.alert(
      'Empty Cart',
      'Are you sure you want to empty the cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: emptyCart }
      ]
    );
  };

  // Render individual cart item
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSubDetails}>{item.details}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => decrementQuantity(item.name)}>
            <Icon name="minus" size={16} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => incrementQuantity(item.name)}>
            <Icon name="plus" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.itemPrice}>₹{(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <FlatList
          data={cart}
          renderItem={renderCartItem}
          keyExtractor={(item, index) => index.toString()}
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
          ListFooterComponent={() => (
            <View style={styles.footer}>
              <View style={styles.addressContainer}>
                <Text style={styles.addressTitle}>SHIPPING ADDRESS</Text>
                <Text style={styles.addressText}>Full name: Margot Foster</Text>
                <Text style={styles.addressText}>Email address: margotfoster@example.com</Text>
                <Text style={styles.addressText}>Address: 606-3727 Ullamcorper Street, Roseville NH 11523</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddAddressScreen')}>
                  <Text style={styles.addAddress}>Add New Address</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>TOTAL</Text>
                <Text style={styles.totalPrice}>₹{calculateTotalPrice()}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.emptyCartButton} onPress={handleEmptyCart}>
                  <Text style={styles.buttonText}>Empty Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sendRequestButton} onPress={() => navigation.navigate('ShippingDeets')}>
                  <Text style={styles.buttonText}>Send Request</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyCartContainer}>
              <Text style={styles.emptyCartText}>Your cart is empty</Text>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles for the Cart Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c',
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
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#333',
    marginBottom: 10,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  itemSubDetails: {
    color: '#888',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#444',
    padding: 5,
    borderRadius: 5,
  },
  quantityText: {
    color: '#fff',
    marginHorizontal: 10,
  },
  itemPrice: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    padding: 20,
    backgroundColor: '#1e1e1e',
  },
  addressContainer: {
    marginBottom: 20,
  },
  addressTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  addressText: {
    color: '#888',
    marginBottom: 5,
  },
  addAddress: {
    color: '#f0c14b',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  totalText: {
    color: '#fff',
    fontSize: 16,
  },
  totalPrice: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyCartButton: {
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 5,
  },
  backButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
  },
  sendRequestButton: {
    backgroundColor: '#f0c14b',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  emptyCartContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyCartText: {
    color: '#888',
    fontSize: 18,
  },
});

export default CartScreen;