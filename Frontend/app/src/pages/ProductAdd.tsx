import { shopDto } from "@/app/src/types/common/data.types";
import React, { useEffect } from "react";
import { getData, deleteDataId } from "@/app/src/api/controllers/new-controller";
import { TouchableOpacity, View, Alert } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native"

type RootStackParamList = {
    HomePage: undefined;
    MainPage: undefined;
    ProductAdd: undefined;
    ShopPage: undefined;
    ProductCreate: { id?: number };
    ProductEdit: { id?: number};
    ProductPage: { id?: number };
};
const ProductAdd = () => {
    
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [data, setData] = React.useState<shopDto[]>();

    const handleCreate = () => {
        const newItem: shopDto = {
          name: "",
          cost: 0,
          info: "",
          image: "",
          id: undefined
        };
        navigation.navigate("ProductCreate", { id: newItem.id });
    };

        const handleEdit = (item: shopDto) => {
        if (item.id) {
            navigation.navigate("ProductEdit", { id: item.id });
        } else {
            Alert.alert('Ошибка', 'ID записи не найден');
        }
    };


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
            onPress={() => navigation.navigate("ProductAdd")}
        >
            Создать новую запись
        </TouchableOpacity>

        {data?.map((item, key) => (
            <View>
                <View>
                            <View
                            >
                                Имя: {item.name}
                            </View>
                            <View
                            >
                                Цена: {item.cost}
                            </View>
                            <View
                            >
                                Информация: {item.info}
                            </View>
                            <View>
                                Ссылка на изображение продукта: {item.image}
                            </View>
                        </View>
                        <View
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate("ProductEdit", {id: item.id})}
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
            ))
        }
    </View>
}


export default ProductAdd