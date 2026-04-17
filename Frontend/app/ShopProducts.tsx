import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const cardWidth = width / 2 - 24;

interface ShopProductProps {
    id?: number;
    name: string;
    cost: number;
    image: string;
    info: string;
}

const ShopProducts = (props: ShopProductProps) => {
    const navigation = useNavigation<NavigationProp<any>>();

    // Формируем правильный URL для заглушки картинок


    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ProductPage", { id: props.id })}
            activeOpacity={0.8}
        >
            <View style={styles.imageContainer}>
<Image
    source={{ uri: props.image }} // Просто передаем строку из JSON
    style={styles.image}    // Твои стили для превью
    resizeMode="cover"
/>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.name} numberOfLines={2}>
                    {props.name || "Без названия"}
                </Text>

                <View style={styles.priceRow}>
                    <Text style={styles.price}>
                        {props.cost ? props.cost.toLocaleString() : 0} ₽
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        width: cardWidth,
        margin: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 4,
        overflow: "hidden",
    },
    imageContainer: {
        width: "100%",
        height: 160,
        backgroundColor: "#f9f9f9",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    infoContainer: {
        padding: 12,
    },
    name: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
        height: 40,
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    price: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1A1A1A",
    },
});

export default ShopProducts;