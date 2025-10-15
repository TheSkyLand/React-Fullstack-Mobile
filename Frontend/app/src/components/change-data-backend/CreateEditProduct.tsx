import React, { useState, useEffect, useRef } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { createData, editDataId, getDataId } from "../../api/controllers/new-controller";
import { TextInput, TouchableOpacity, View } from "react-native";

type RouteParams = {
    id?: string | number;
};


const CreateEditProduct = () => {
    const navigation = useNavigation();
    const route = useRoute();
    
    const params = route.params as RouteParams;
    const id = params?.id ? Number(params.id) : undefined;


    const [cost, setCost] = React.useState('');
    const [name, setName] = React.useState('');
    const [info, setInfo] = React.useState('');
    const [image, setImage] = React.useState('')

    useEffect(() => {
        if (id) {
            getDataId(+id)
                .then((response) => {
                    setName(response.data.name);
                    setCost(response.data.cost?.toString() || '');
                    setInfo(response.data.info);
                    setImage(response.data.image)
                })
                .catch((e) => console.log(e));
        }
    }, [id]);

    const processingRequest = () => {
        const data = {
            name: name,
            cost: Number(cost),
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
        <View
        >
            {id ? 'Редактировать запись' : 'Создать новую запись'}
        </View>
        <View>
            Имя:
        </View>
        <TextInput
            value={name}
            onChangeText={setName}
        />
        <View>
            Цена:
        </View>
        <TextInput
            value={cost}
            onChangeText={setCost}
            keyboardType="numeric"
        />
        <View>
            Информация:
        </View>
        <TextInput
            value={info}
            onChangeText={setInfo}
        >
        </TextInput>
        <View>
            путь к фотографии товара:
        </View>
        <TextInput
            value={image}
            onChangeText={setImage}
        ></TextInput>
        <TouchableOpacity
            onPress={processingRequest}
        >
            {id ? `Редактировать запись` : `Создать новую запись`}
        </TouchableOpacity>
    </View>
}

export default CreateEditProduct;