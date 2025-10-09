import { shopDto } from "@/app/src/types/common/data.types";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import React, { useEffect } from "react";
import { getData, deleteDataId } from "@/app/src/api/controllers/new-controller";
import { RootStackParamList } from "../Router/Router";
import ProductPage from "./ProductPage";
import CreateEditProduct from "../components/change-data-backend/CreateEditProduct";
import { Button, View, Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
const ProductAdd = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [data, setData] = React.useState<shopDto[]>();
    const renderItem = ({ item }: { item: shopDto }) => (
        <View>
            <View>
                <Text >Имя: {item.name}</Text>
                <Text >Цена: {item.cost}</Text>
                <Text >Инфо: {item.info}</Text>
                <Text >картинка: {item.image}</Text>
            </View>
        </View>
    );
    useEffect(() => {
        getData()
            .then((response) => {
                setData(response.data);
            })
            .catch(e => console.log(e));
    }, []);

    const deleteRecord = (idRecord: number) => {
        deleteDataId(idRecord)
            .then((response) => {
                console.log(response);
                getData()
                    .then((response) => {
                        setData(response.data);
                    })
                    .catch(e => console.log(e));
            })
            .catch((e) => console.log(e));
    }
    return <View
    >
        <TouchableOpacity
            onPress={() => navigation.navigate('ProductAdd')}
        >
            Создать новую запись
        </TouchableOpacity>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.toString()}
            showsVerticalScrollIndicator={false}
        />
        <View
        >
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                Изменить
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => deleteRecord(Number(item.id))}
            >
                Удалить
            </TouchableOpacity>
        </View>
    </View>
}


export default ProductAdd