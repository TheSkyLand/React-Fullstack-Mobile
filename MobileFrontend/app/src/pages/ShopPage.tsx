import React, { useEffect } from "react";
import ShopProducts from "@/app/src/components/ShopProducts";

import { getData, } from "@/app/src/api/controllers/new-controller";
import { shopDto } from "@/app/src/types/common/data.types";

import ShopHeader from "@/app/src/components/ShopHeader";
import { View, Text, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";


const ShopPage = () => {
    const [data, setData] = React.useState<shopDto[]>();
    useEffect(() => {
        getData()
            .then((response) => {
                setData(response.data);
            })
            .catch(e => console.log(e));
    }, []);

    return (
        <View>
            <ShopHeader />
            <ScrollView>
                {data?.map((item, key) => (
                    <ShopProducts 
                    id={key} cost={item.cost} name={item.name} info={item.info} image="ibanez1"
                    
                    />


                ))}
            </ScrollView>
        </View>
    )
};

export default ShopPage;