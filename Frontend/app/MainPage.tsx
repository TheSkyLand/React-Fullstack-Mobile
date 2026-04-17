import React, { useEffect } from "react";
import { getCommon } from "@/app/api/controllers/new-controller";
import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { shopDto } from "./types/common/data.types";
import { Settings, ArrowRight, Database } from "lucide-react-native"; // Иконки

type RootStackParamList = {
    HomePage: undefined;
    ProductAdd: undefined;
    ShopPage: undefined;
    ProductEdit: undefined;
};

const MainPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [data, setData] = React.useState<shopDto[]>([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        getCommon()
            .then((response) => {
                setData(response.data.message);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Иконка и заголовок */}
                <View style={styles.headerBlock}>
                    <View style={styles.iconCircle}>
                        <Database color="#6366f1" size={32} />
                    </View>
                    <Text style={styles.title}>Управление данными</Text>
                    <Text style={styles.subtitle}>
                        {loading ? "Загрузка информации..." : `Всего товаров в базе: ${data?.length || 0}`}
                    </Text>
                </View>

                {/* Основная кнопка действия */}
                <TouchableOpacity
                    style={styles.mainButton}
                    onPress={() => navigation.navigate("ProductAdd")} // Исправил на ProductAdd, так как обычно правят там
                    activeOpacity={0.7}
                >
                    <View style={styles.buttonTextContainer}>
                        <Settings color="#fff" size={20} />
                        <Text style={styles.buttonText}>Редактировать каталог</Text>
                    </View>
                    <ArrowRight color="#fff" size={20} />
                </TouchableOpacity>

                {/* Если идет загрузка, покажем спиннер */}
                {loading && <ActivityIndicator size="large" color="#6366f1" style={{ marginTop: 20 }} />}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F7FF", // Приятный светло-голубой фон
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    headerBlock: {
        alignItems: "center",
        marginBottom: 40,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1A1A1A",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginTop: 8,
        textAlign: "center",
    },
    mainButton: {
        flexDirection: "row",
        backgroundColor: "#6366f1",
        width: "100%",
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 4,
        shadowColor: "#6366f1",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    buttonTextContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 12,
    },
});

export default MainPage;