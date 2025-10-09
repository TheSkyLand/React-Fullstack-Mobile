import React, { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { createData, editDataId, getDataId } from "@/app/src/api/controllers/new-controller";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
type RouteParams = {
    id?: string | number;
};


const CreateEditProduct = () => {

    const route = useRoute();
    const navigation = useNavigation();
    // Получаем ID из параметров маршрута и преобразуем в число
    const params = route.params as RouteParams;
    const id = params?.id ? Number(params.id) : undefined;




    const [cost, setCost] = React.useState('');
    const [name, setName] = React.useState('');
    const [info, setInfo] = React.useState('');
    const [image, setImage] = React.useState('')
    const [loading, setLoading] = useState(false);

    console.log('ID from route:', id);
    console.log('Current state - name:', name, 'cost:', cost);

    useEffect(() => {
        if (id && isNaN(id)) {

            getDataId(id)
                .then((response) => {
                    setName(response.data.name);
                    setCost(response.data.cost?.toString);
                    setInfo(response.data.info);
                    setImage(response.data.image)
                })
                .catch((e) => console.log(e));
        }
    }, [id]);

    const processingRequest = () => {
        const data = {
            name: name.trim(),
            cost: Number(cost),
            info: info.trim(),
            image: image.trim()

        };



        id ?
            editDataId(id, data)
                .then(() => {
                    navigation.goBack();
                })
                .catch((e) => console.log(e))
            :
            createData(data)
                .then(() => {
                    navigation.goBack();
                })
                .catch((e) => console.log(e))
    }

    return <ScrollView
    >
        <Text
        >
            {id ? 'Редактировать запись' : 'Создать новую запись'}
        </Text>
        <Text>
            Имя:
        </Text>
        <TextInput
            value={name}
            onChangeText={setName}
        />
        <Text>
            Цена:
        </Text>
        <TextInput
            value={cost}
            onChangeText={setCost}
        />
        <Text>
            Информация:
        </Text>
        <TextInput
            value={info}
            onChangeText={setInfo}
        >
        </TextInput>
        <Text>
            путь к фотографии товара:
        </Text>
        <TextInput
            value={image}
            onChangeText={setImage}
        ></TextInput>
        <TouchableOpacity
            onPress={processingRequest}
        >
            {id ? `Редактировать запись` : `Создать новую запись`}
        </TouchableOpacity>
                    <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Text>
                    Назад
                </Text>
            </TouchableOpacity>
    </ScrollView>
}

export default CreateEditProduct;