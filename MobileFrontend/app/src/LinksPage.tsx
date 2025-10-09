import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';


const linking = {
  prefixes: [],
};


const LinksPage = () => {
  return (<View>
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      sdsfs
    </NavigationContainer>
  </View>

  );
}

export default LinksPage