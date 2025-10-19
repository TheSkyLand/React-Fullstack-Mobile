import React, { useEffect } from "react";
import { getCommon } from "@/app/api/controllers/new-controller";
import { TouchableOpacity, View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { shopDto } from "./types/common/data.types";

type RootStackParamList = {
    HomePage: undefined;
    MainPage: undefined;
    ProductAdd: undefined;
    ShopPage: undefined;
    ProductEdit: undefined;
    CreateEdit: { id?: number };
    ProductPage: { id?: number };
};

const MainPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [data, setData] = React.useState<shopDto[]>();



  useEffect(() => {
    getCommon()
      .then((response) => {
        console.log(response);
        setData(response.data.message);
      })
      .catch((e) => console.log(e));
  }, []);



  return <View
  >
    <View
    >
    </View>
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductEdit")}
    >
      Change data
    </TouchableOpacity>
  </View>
};

export default MainPage;