import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './app/src/HomePage';
import LinksPage from './app/src/LinksPage';

const Stack = createNativeStackNavigator();

const App = () => {
return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="LinksPage" component={LinksPage} />
    </Stack.Navigator>
    </NavigationContainer>
);
};

export default App;