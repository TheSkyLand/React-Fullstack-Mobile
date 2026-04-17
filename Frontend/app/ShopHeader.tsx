import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Platform } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Home, ShoppingBag, PlusCircle } from "lucide-react-native"; // Иконки

type RootStackParamList = {
  HomePage: undefined;
  ShopPage: undefined;
  ProductAdd: undefined;
};

const ShopHeader = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate("HomePage")}
        >
          <Home size={22} color="#1A1A1A" />
          <Text style={styles.navText}>Главная</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate("ShopPage")}
        >
          <ShoppingBag size={22} color="#1A1A1A" />
          <Text style={styles.navText}>Каталог</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, styles.adminBtn]} 
          onPress={() => navigation.navigate('ProductAdd')}
        >
          <PlusCircle size={20} color="#6366f1" />
          <Text style={[styles.navText, { color: '#6366f1' }]}>Admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 50 : 20, // Учет челки/статусбара
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
      android: { elevation: 3 },
    }),
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  adminBtn: {
    backgroundColor: '#F5F3FF', // Светло-фиолетовый акцент
    borderRadius: 12,
    marginVertical: 8,
    paddingVertical: 4,
  }
});

export default ShopHeader;
