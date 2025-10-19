import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './app/HomePage';
import DetailsPage from'./app/DetailsPage';

const Stack = createNativeStackNavigator();

const App = () => {
return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Details" component={DetailsPage} />
    </Stack.Navigator>
    </NavigationContainer>
);
};

export default App;