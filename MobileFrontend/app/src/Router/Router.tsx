import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '@/app/src/pages/HomePage';
import MainPage from '@/app/src/pages/MainPage';
import ProductAdd from '@/app/src/pages/ProductAdd';
import ProductPage from '@/app/src/pages/ProductPage';
import ShopPage from '@/app/src/pages/ShopPage';


const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  MainPage: undefined;
  HomePage: undefined;
  ProductAdd: undefined;
  ProductPage: { id?: number };
  ShopPage: undefined;
};

const App = () => {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainPage">

          <Stack.Screen 
          name="MainPage" 
          component={MainPage} 
          />

          <Stack.Screen
          name="HomePage" 
          component={HomePage} 
          />

          <Stack.Screen 
          name="ProductAdd" 
          component={ProductAdd} 
          />
          <Stack.Screen 
          name="ProductPage" 
          component={ProductPage} 
          />
          <Stack.Screen 
          name="ShopPage" 
          component={ShopPage} 
          />

        </Stack.Navigator>

      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

export default App    