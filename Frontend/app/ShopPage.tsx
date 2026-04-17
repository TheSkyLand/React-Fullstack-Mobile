import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import ShopProducts from "@/app/ShopProducts";
import ShopHeader from "./ShopHeader";
import { getData } from "@/app/api/controllers/new-controller";
import { shopDto } from "@/app/types/common/data.types";

const ShopPage = () => {
    const [data, setData] = useState<shopDto[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = () => {
        setLoading(true);
getData()
    .then((response) => {
        // Проверяем: если response.data — это твой объект из файла, 
        // то берем из него ключ productsData
        const products = response.data.productsData || response.data;
        setData(products);
    })
            .catch(e => console.log("Ошибка загрузки:", e))
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        loadData();
    }, []);

return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}> 
        <ShopHeader />
        <FlatList
            style={{ flex: 1 }} // Добавь это
            data={data}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            numColumns={2}
            renderItem={({ item }) => (
                <ShopProducts 
                    id={item.id} 
                    cost={item.cost} 
                    name={item.name} 
                    info={item.info} 
                    image={item.image} 
                />
            )}
        />
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8F9FA" },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    listContent: { paddingHorizontal: 8, paddingBottom: 20 },
    row: { justifyContent: "space-between" },
});

export default ShopPage;