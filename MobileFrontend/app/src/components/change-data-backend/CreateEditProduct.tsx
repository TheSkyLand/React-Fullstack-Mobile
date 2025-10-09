import React, { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { createData, editDataId, getDataId } from "@/app/src/api/controllers/new-controller";
import { View, Text, Button, TextInput } from "react-native";
type RouteParams = {
    id?: string | number;
};


const CreateEditProduct = () => {

    const route = useRoute();
    const navigation = useNavigation();
    // Получаем ID из параметров маршрута и преобразуем в число
    const params = route.params as RouteParams;
    const id = params?.id ? Number(params.id) : undefined;

    


    const [cost, setCost] = React.useState(0);
    const [name, setName] = React.useState('');
    const [info, setInfo] = React.useState('');
    const [image, setImage] = React.useState('')

    useEffect(() => {
        if (id) {
            getDataId(+id)
                .then((response) => {
                    setName(response.data.name);
                    setCost(response.data.cost);
                    setInfo(response.data.info);
                    setImage(response.data.image)
                })
                .catch((e) => console.log(e));
        }
    }, [id]);

    const processingRequest = () => {
        const data = {
            name: name,
            cost: cost,
            info: info,
            image: image
        }

        id ?
            editDataId(+id, data)
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

    return <View
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
            onChange={(e) => setName(e.target.value)}
        />
        <Text>
            Цена:
        </Text>
        <TextInput
            value={cost === 0 ? '' : cost}
            type="number"

            onChange={(e) => setCost(+e.target.value)}
        />
        <Text>
            Информация:
        </Text>
        <TextInput
            value={info}
            onChange={(e) => setInfo(e.target.value)}
        >
        </TextInput>
        <Text>
            путь к фотографии товара:
        </Text>
        <TextInput
            value={image}
            onChange={(e) => setImage(e.target.value)}
        ></TextInput>
        <Button
            onClick={processingRequest}
            sx={{
                display: 'block',
                mt: 2
            }}
        >
            {id ? `Редактировать запись` : `Создать новую запись`}
        </Button>
    </View>
}

export default CreateEditProduct;