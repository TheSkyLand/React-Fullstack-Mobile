import { useNavigation, NavigationProp } from "@react-navigation/native";
import { getCommon } from "../api/controllers/new-controller";
import { RootStackParamList } from "../Router/Router";
import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";

const MainPage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [data, setData] = React.useState();

  useEffect(() => {
    getCommon()
      .then((response) => {
        console.log(response);
        setData(response.data.message);
      })
      .catch((e) => console.log(e));
  }, []);

  return <View>
    <Text
    >
      {
        data ? data : 'Данных с сервера нет'
      }
    </Text>
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductAdd")}
    >
      Change data
    </TouchableOpacity>
  </View>
};

export default MainPage;