import React, { useEffect } from "react";
import ShopProducts from "@/app/ShopProducts";

import { getData, } from "@/app/api/controllers/new-controller";

import { shopDto } from "@/app/types/common/data.types";
import { useNavigation, useRoute } from "@react-navigation/native"
import ShopHeader from "./ShopHeader";
import { View, Text } from "react-native";


type RouteParams = {
    id?: string | number;
};

const ShopPage = () => {
    const navigation = useNavigation();
    const [data, setData] = React.useState<shopDto[]>();

    const route = useRoute();

    const params = route.params as RouteParams;
    const id = params?.id ? Number(params.id) : undefined;


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

            {data?.map((item, key) => (
                <View
                    key={`listItem-${key}`}
                >
                    <ShopProducts id={key} cost={item.cost} name={item.name} info={item.info} image={item.image} />

                </View>
            ))}
        </View>
    )
};

export default ShopPage;