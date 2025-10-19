// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from '../MainPage';
import HomePage from '../HomePage';
import ShopPage from '../ShopPage';
import ProductAdd from '../ProductAdd';
import ProductPage from '../ProductPage';
import CreateEditProduct from '../CreateEditProduct';

export type RootStackParamList = {
  HomePage: undefined;
  MainPage: undefined;
  ProductAdd: undefined;
  ShopPage: undefined;
  CreateEditProduct: { id?: number };
  ProductPage: { id?: number };
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ title: 'Главная страница' }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ title: 'Журнал' }}
        />
                <Stack.Screen
          name="ShopPage"
          component={ShopPage}
          options={{ title: 'Журнал' }}
        />
        <Stack.Screen
          name="ProductAdd"
          component={ProductAdd}
          options={{ title: '1 курс' }}
        />
        <Stack.Screen
          name="ProductPage"
          component={ProductPage}
          options={{ title: 'Создание/Редактирование' }}
        />
        <Stack.Screen
          name="CreateEditProduct"
          component={CreateEditProduct}
          options={{ title: 'Создание/Редактирование' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;