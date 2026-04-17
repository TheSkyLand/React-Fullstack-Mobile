import React, { useEffect } from "react"
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from "react-native"
import { useRoute } from '@react-navigation/native';
import ShopHeader from "@/app/ShopHeader"
import { getDataId } from "@/app/api/controllers/new-controller"
import { shopDto } from "@/app/types/common/data.types"

const { width } = Dimensions.get("window");

const ProductPage = () => {
    const [data, setData] = React.useState<shopDto | null>(null);
    const [loading, setLoading] = React.useState(true);

    const route = useRoute();
    const params = route.params as { id?: string | number };
    const id = params?.id !== undefined ? Number(params.id) : undefined;

    useEffect(() => {
        setData(null);
        if (id !== undefined && !isNaN(id)) {
            setLoading(true);
            getDataId(id)
                .then((response) => {
                    setData(response.data);
                })
                .catch(e => console.log("Ошибка API:", e))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading && !data) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#6366f1" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ShopHeader />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={{
                        uri: data?.image?.startsWith('http')
                            ? data.image
                            : `https://unsplash.com/{encodeURIComponent(data?.name || 'instrument')}&sig=${id}`
                    }}
                    style={styles.mainImage}
                    resizeMode="cover"
                    onError={(e) => console.log("Ошибка загрузки картинки:", e.nativeEvent.error)}
                />
                <View style={styles.infoBlock}>
                    <Text style={styles.name}>{data?.name || "Загрузка..."}</Text>
                    <View style={styles.priceBadge}>
                        <Text style={styles.price}>{data?.cost?.toLocaleString()} ₽</Text>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.descriptionTitle}>Описание</Text>
                    <Text style={styles.description}>{data?.info}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    mainImage: { width: width, height: width, backgroundColor: '#f9f9f9' },
    infoBlock: { padding: 20 },
    name: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 12 },
    priceBadge: { backgroundColor: '#F5F3FF', alignSelf: 'flex-start', padding: 8, borderRadius: 8 },
    price: { fontSize: 20, color: '#6366f1', fontWeight: '700' },
    divider: { height: 1, backgroundColor: '#eee', marginVertical: 20 },
    descriptionTitle: { fontSize: 16, fontWeight: '600', color: '#1A1A1A', marginBottom: 8 },
    description: { fontSize: 15, lineHeight: 22, color: '#444' }
})

export default ProductPage;
