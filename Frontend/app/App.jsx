import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/pages/HomePage';
import MainPage from './src/pages/MainPage';
import ProductAdd from './src/pages/ProductAdd';
import ProductPage from './src/pages/ProductPage';
import ShopPage from './src/pages/ShopPage';
import CreateEditProduct from './src/components/change-data-backend/CreateEditProduct';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
          
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="MainPage" component={MainPage} />

          <Stack.Screen name="ProductAdd" component={ProductAdd} />
          <Stack.Screen name="ProductCreate" component={CreateEditProduct} />
          <Stack.Screen name="ProductEdit" component={CreateEditProduct} />

          <Stack.Screen name="ProductPage" component={ProductPage} />

          <Stack.Screen name="ShopPage" component={ShopPage} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}


export default App;