import React, { useState, useEffect } from "react";
import { 
    TextInput, TouchableOpacity, View, Alert, Text, 
    StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform 
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createData, editDataId, getDataId } from "@/app/api/controllers/new-controller";
import { ChevronLeft, Save } from "lucide-react-native"; // Иконки

const CreateEditProduct = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const params = route.params as { id?: string | number };
    const id = params?.id ? Number(params.id) : undefined;

    const [cost, setCost] = useState('');
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (id && !isNaN(id)) {
            getDataId(id)
                .then((res) => {
                    setName(res.data.name || '');
                    setCost(res.data.cost?.toString() || '');
                    setInfo(res.data.info || '');
                    setImage(res.data.image || '');
                })
                .catch(() => Alert.alert('Ошибка', 'Не удалось загрузить данные'));
        }
    }, [id]);

    const processingRequest = () => {
        if (!name.trim() || !cost || !info.trim()) {
            Alert.alert('Ошибка', 'Заполните все обязательные поля');
            return;
        }

        const data = {
            name: name.trim(),
            cost: Number(cost),
            info: info.trim(),
            image: image.trim()
        };

        const request = id ? editDataId(id, data) : createData(data);

        request
            .then(() => {
                Alert.alert('Успешно', id ? 'Обновлено' : 'Создано', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            })
            .catch(() => Alert.alert('Ошибка', 'Действие не удалось'));
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                {/* Хедер формы */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft color="#1A1A1A" size={28} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        {id ? 'Редактирование' : 'Новый товар'}
                    </Text>
                    <View style={{ width: 28 }} /> 
                </View>

                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Название товара</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Напр: Кроссовки Nike"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Цена (₽)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0"
                            value={cost}
                            onChangeText={setCost}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Описание</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Расскажите о товаре..."
                            value={info}
                            onChangeText={setInfo}
                            multiline
                            numberOfLines={4}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Ссылка на фото</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="https://image-url.com..."
                            value={image}
                            onChangeText={setImage}
                        />
                    </View>

                    <TouchableOpacity style={styles.submitBtn} onPress={processingRequest}>
                        <Save color="#fff" size={20} style={{ marginRight: 8 }} />
                        <Text style={styles.submitBtnText}>
                            {id ? 'Сохранить изменения' : 'Создать товар'}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    backBtn: {
        padding: 4,
    },
    form: {
        padding: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#1A1A1A',
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    submitBtn: {
        backgroundColor: '#6366f1',
        flexDirection: 'row',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: "#6366f1",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    submitBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default CreateEditProduct;