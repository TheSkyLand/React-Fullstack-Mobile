import React, { useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Alert, SafeAreaView } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Plus, Edit2, Trash2, Package } from "lucide-react-native"; // Иконки
import { shopDto } from "@/app/types/common/data.types";
import { getData, deleteDataId } from "@/app/api/controllers/new-controller";

type RootStackParamList = {
    CreateEditProduct: { id?: number };
};

const ProductAdd = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [data, setData] = React.useState<shopDto[]>([]);

    const loadData = () => {
        getData()
            .then((response) => setData(response.data))
            .catch(e => console.log(e));
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleCreate = () => {
        navigation.navigate("CreateEditProduct", { id: undefined });
    };

    const handleEdit = (item: shopDto) => {
        if (item.id) {
            navigation.navigate("CreateEditProduct", { id: item.id });
        } else {
            Alert.alert('Ошибка', 'ID записи не найден');
        }
    };

    const confirmDelete = (idRecord: number) => {
        Alert.alert(
            "Удаление",
            "Вы уверены, что хотите удалить этот товар?",
            [
                { text: "Отмена", style: "cancel" },
                { text: "Удалить", style: "destructive", onPress: () => deleteRecord(idRecord) }
            ]
        );
    };

    const deleteRecord = (idRecord: number) => {
        deleteDataId(idRecord)
            .then(() => loadData())
            .catch((e) => console.log(e));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Управление товарами</Text>
                <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
                    <Plus color="#fff" size={20} />
                    <Text style={styles.createBtnText}>Добавить</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.list}>
                {data?.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <View style={styles.cardInfo}>
                            <View style={styles.iconBadge}>
                                <Package color="#6366f1" size={20} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.itemName}>{item.name || "Без названия"}</Text>
                                <Text style={styles.itemPrice}>{item.cost} ₽</Text>
                            </View>
                        </View>

                        <View style={styles.actions}>
                            <TouchableOpacity 
                                style={[styles.actionBtn, styles.editBtn]} 
                                onPress={() => handleEdit(item)}
                            >
                                <Edit2 color="#6366f1" size={18} />
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={[styles.actionBtn, styles.deleteBtn]} 
                                onPress={() => confirmDelete(Number(item.id))}
                            >
                                <Trash2 color="#ef4444" size={18} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    createBtn: {
        flexDirection: 'row',
        backgroundColor: '#6366f1',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
    },
    createBtnText: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 4,
    },
    list: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconBadge: {
        width: 40,
        height: 40,
        backgroundColor: '#F5F3FF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    itemPrice: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editBtn: {
        backgroundColor: '#F5F3FF',
    },
    deleteBtn: {
        backgroundColor: '#FEF2F2',
    },
});

export default ProductAdd;