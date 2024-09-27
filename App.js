import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { 
  Login, Signup, Welcome, CodeScreen, CompanyDeets, ForgotPass, 
  ForgotOtp, Changepassword, Home, Support, ProductDetailsScreen, 
  CartScreen, Search, Shippingdeets, Categories 
} from "./screens";
import { CartProvider } from './screens/OrderScreens/CartContext';

const Stack = createNativeStackNavigator(); // Renamed the stack to follow PascalCase convention

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false, // Default to hide headers for consistency, will override in specific screens
          }}
        >
          {/* Auth Screens */}
          <Stack.Screen
            name="Welcome"
            component={Welcome}
          />
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
          />
          <Stack.Screen
            name="CodeScreen"
            component={CodeScreen}
          />
          <Stack.Screen
            name="CompanyDeets"
            component={CompanyDeets}
          />
          <Stack.Screen
            name="ForgotPass"
            component={ForgotPass}
          />
          <Stack.Screen
            name="ForgotOtp"
            component={ForgotOtp}
          />
          <Stack.Screen
            name="Changepassword"
            component={Changepassword}
          />
          
          {/* Main App Screens */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: true, // Show header for the Home screen
              title: 'Dashboard', // Custom header title for better UX
            }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{
              headerShown: true,
              title: 'Product Details', // Custom title for better UX
            }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              headerShown: true,
              title: 'Your Cart',
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              headerShown: true,
              title: 'Search',
            }}
          />
          <Stack.Screen
            name="Shippingdeets"
            component={Shippingdeets}
            options={{
              headerShown: true,
              title: 'Shipping Details',
            }}
          />
          <Stack.Screen
            name="Categories"
            component={Categories}
            options={{
              headerShown: true,
              title: 'Categories',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}