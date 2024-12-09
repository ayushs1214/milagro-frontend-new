import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { 
  Login, Signup, Welcome, CodeScreen, CompanyDeets, ForgotPass, 
  ForgotOtp, Changepassword, Home, Support, ProductDetailsScreen, 
  CartScreen, Search, Shippingdeets, Categories 
} from "./screens";
import { CartProvider } from './screens/OrderScreens/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="CodeScreen" component={CodeScreen} />
    <Stack.Screen name="CompanyDeets" component={CompanyDeets} />
    <Stack.Screen name="ForgotPass" component={ForgotPass} />
    <Stack.Screen name="ForgotOtp" component={ForgotOtp} />
    <Stack.Screen name="Changepassword" component={Changepassword} />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: true, 
        title: 'Dashboard', 
      }}
    />
    <Stack.Screen
      name="ProductDetails"
      component={ProductDetailsScreen}
      options={{
        headerShown: true,
        title: 'Product Details', 
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
);

const Navigation = () => {
  const { user } = useAuth();
  return user ? <MainStack /> : <AuthStack />;
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}