import { TouchableOpacity, View } from "react-native"
import { useNavigation, NavigationProp  } from "@react-navigation/native"


type RootStackParamList = {
    HomePage: undefined;
    MainPage: undefined;
    ProductAdd: undefined;
    ShopPage: undefined;
    CreateEdit: { id?: number };
    ProductPage: { id?: number };
};


const ShopHeader = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return (
        <View>
            <TouchableOpacity
            onPress={() => navigation.navigate("HomePage")}
            >
                домашняя страница
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigate("ShopPage")}
            >
                каталог
            </TouchableOpacity>
            <View
            >
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('ProductAdd')}
            >admin</TouchableOpacity>
        </View>

    )
}

export default ShopHeader