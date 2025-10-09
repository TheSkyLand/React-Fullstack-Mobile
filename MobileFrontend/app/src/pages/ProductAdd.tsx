import { shopDto } from "@/app/src/types/common/data.types";
import { useNavigation, NavigationProp, useRoute, useLinkTo } from "@react-navigation/native";
import { getData, deleteDataId } from "@/app/src/api/controllers/new-controller";
import { RootStackParamList } from "../Router/Router";
import { Button, View, Text, TouchableOpacity } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import React, { useEffect } from "react";

type RouteParams = {
    id?: string | number;
};


const ProductAdd = () => {
    const linkTo = useLinkTo();
    const route = useRoute();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const params = route.params as RouteParams;
    const [data, setData] = React.useState<shopDto[]>();

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
            onPress={() => linkTo('/product-add/new/')}
        >
            Создать новую запись
        </TouchableOpacity>
        <ScrollView>
            {data?.map((item, key) => (
                <View>
                    <Text>Имя: {item.name}</Text>
                    <Text>Цена: {item.cost}</Text>
                    <Text>Информация: {item.info}</Text>
                    <Text>Ссылка на изображение: {item.image}</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ProductAdd")}
                    >
                        Изменить
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => deleteRecord(Number(item.id))}
                    >
                        Удалить
                    </TouchableOpacity>
                </View>



            ))}

        </ScrollView>
    </View>
}


export default ProductAdd