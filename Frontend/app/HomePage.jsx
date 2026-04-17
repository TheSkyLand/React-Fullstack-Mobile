import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import ShopHeader from "@/app/ShopHeader";
import { Sparkles, ArrowRight } from "lucide-react-native"; // Иконки для красоты

const { width } = Dimensions.get("window");

const HomePage = () => {
    return (
        <View style={styles.container}>
            {/* Хедер всегда сверху */}
            <ShopHeader />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 1. Главный баннер */}
                <View style={styles.bannerContainer}>
                    <ImageBackground
                        source={{ uri: 'https://unsplash.com' }}
                        style={styles.banner}
                        imageStyle={{ borderRadius: 24 }}
                    >
                        <View style={styles.bannerOverlay}>
                            <View style={styles.tag}>
                                <Sparkles size={14} color="#fff" />
                                <Text style={styles.tagText}>Новая коллекция</Text>
                            </View>
                            <Text style={styles.bannerTitle}>Летняя распродажа</Text>
                            <Text style={styles.bannerSubtitle}>Скидки до 50% на все товары</Text>
                            
                            <TouchableOpacity style={styles.bannerBtn}>
                                <Text style={styles.bannerBtnText}>Перейти в каталог</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>

                {/* 2. Категории или спецпредложения */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Популярное</Text>
                        <TouchableOpacity style={styles.seeAll}>
                            <Text style={styles.seeAllText}>Все</Text>
                            <ArrowRight size={14} color="#6366f1" />
                        </TouchableOpacity>
                    </View>
                    
                    {/* Здесь будет твой список ShopProducts или заглушка */}
                    <View style={styles.placeholderList}>
                        <Text style={styles.placeholderText}>
                            Тут можно вывести FlatList с твоими товарами
                        </Text>
                    </View>
                </View>

                {/* 3. Декоративный блок */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoCardTitle}>Бесплатная доставка</Text>
                    <Text style={styles.infoCardDesc}>При заказе от 5000 ₽ привезем заказ бесплатно!</Text>
                </View>

                {/* Отступ снизу */}
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA", // Светлый фон всей страницы
    },
    bannerContainer: {
        padding: 16,
    },
    banner: {
        width: '100%',
        height: 200,
        justifyContent: 'flex-end',
    },
    bannerOverlay: {
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.3)', // Затемнение, чтобы текст читался
        borderRadius: 24,
        height: '100%',
        justifyContent: 'center',
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 10,
    },
    tagText: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 4,
        fontWeight: '600',
    },
    bannerTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '800',
    },
    bannerSubtitle: {
        color: '#f0f0f0',
        fontSize: 14,
        marginTop: 4,
    },
    bannerBtn: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginTop: 15,
    },
    bannerBtnText: {
        color: '#000',
        fontWeight: '700',
        fontSize: 14,
    },
    section: {
        paddingHorizontal: 16,
        marginTop: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    seeAll: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        color: '#6366f1',
        marginRight: 4,
        fontWeight: '600',
    },
    placeholderList: {
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#CCC',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    placeholderText: {
        textAlign: 'center',
        color: '#999',
    },
    infoCard: {
        margin: 16,
        padding: 20,
        backgroundColor: '#1A1A1A',
        borderRadius: 24,
    },
    infoCardTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    infoCardDesc: {
        color: '#AAA',
        marginTop: 4,
    }
});

export default HomePage;