import { TouchableOpacity, View } from "react-native"
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../Router/Router";


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
            onPress={() => navigation.navigate("MainPage")}
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