import React, { useState, useEffect, useRef } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { createData, editDataId, getDataId } from "@/app/api/controllers/new-controller"
import { TextInput, TouchableOpacity, View, Alert, Text } from "react-native";

type RouteParams = {
    id?: string | number;
};


const CreateEditProduct = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const params = route.params as RouteParams;
    const id = params?.id ? Number(params.id) : undefined;


    const [cost, setCost] = useState('');
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');
    const [image, setImage] = useState('')

    useEffect(() => {
        if (id && !isNaN(id)) {
            console.log('Fetching data for ID:', id);

            getDataId(id)
                .then((res) => {
                    console.log('Response from API:', res);
                    console.log('Response data:', res.data);
                    setName(res.data.name || '');
                    setCost(res.data.cost?.toString() || '');
                    setInfo(res.data.info || '');
                    setImage(res.data.image || '');
                })
                .catch((e) => {
                    console.error('Error fetching data:', e);
                    console.error('Error details:', e.response);
                    Alert.alert('Ошибка', 'Не удалось загрузить данные');
                })
        }
    }, [id]);

    const processingRequest = () => {
        // Валидация
        if (!name.trim()) {
            Alert.alert('Ошибка', 'Введите имя');
            return;
        }

        if (!cost || isNaN(Number(cost)) || Number(cost) <= 0) {
            Alert.alert('Ошибка', 'Введите корректный возраст');
            return;
        }

                if (!info.trim()) {
            Alert.alert('Ошибка', 'Введите имя');
            return;
        }

                if (!info.trim()) {
            Alert.alert('Ошибка', 'Введите имя');
            return;
        }

        const data = {
            name: name.trim(),
            cost: Number(cost),
            info: info.trim(),
            image: image.trim()
        };

        console.log('Sending data:', data);


        // Проверяем, что id существует и является числом
        if (id && !isNaN(id)) {
            // Редактирование существующей записи
            editDataId(id, data)
                .then(() => {
                    Alert.alert(
                        'Успешно',
                        'Данные обновлены',
                        [
                            {
                                text: 'OK',
                                onPress: () => navigation.goBack()
                            }
                        ]
                    );
                })
                .catch((e) => {
                    console.error('Error updating:', e);
                    console.error('Error response:', e.response);
                    Alert.alert('Ошибка', 'Не удалось обновить данные');
                })
        } else {
            // Создание новой записи
            createData(data)
                .then(() => {
                    Alert.alert(
                        'Успешно',
                        'Данные созданы',
                        [
                            {
                                text: 'OK',
                                onPress: () => navigation.goBack()
                            }
                        ]
                    );
                })
                .catch((e) => {
                    console.error('Error creating:', e);
                    console.error('Error response:', e.response);
                    Alert.alert('Ошибка', 'Не удалось создать данные');
                })
        }
    };

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
                    <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Text>
                    Назад
                </Text>
            </TouchableOpacity>
    </View>
}

export default CreateEditProduct;