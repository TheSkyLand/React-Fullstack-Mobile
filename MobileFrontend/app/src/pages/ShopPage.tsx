import React, { useEffect } from "react";
import ShopGoods from "@/app/src/components/ShopGoods";

import { getData, } from "@/app/src/api/controllers/new-controller";

import { shopDto } from "@/app/src/types/common/data.types";


import ShopHeader from "@/app/src/components/ShopHeader";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";


const ShopPage = () => {
    const [data, setData] = React.useState<shopDto[]>();
    const renderItem = ({ item }: { item: shopDto }) => (
        <View>
            <View>
                <Text >Имя: {item.name}</Text>
                <Text >Цена: {item.cost}</Text>
                <Text >Инфо: {item.info}</Text>
                <Text >картинка: {item.image}</Text>
            </View>
        </View>
    );
    useEffect(() => {
        getData()
            .then((response) => {
                setData(response.data);
            })
            .catch(e => console.log(e));
    }, []);

    return (
        <View>
            <ShopHeader
                id={0}
                name="safs"
                info="asfas"
                cost={0}
                image="ibanez1"

            />

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
            />

        </View>
    )
};

export default ShopPage;