import React, { useEffect } from "react"
import { shopDto } from "@/app/src/types/common/data.types"
import { getData, getDataId } from "@/app/src/api/controllers/new-controller"
import { useNavigation, NavigationProp, useRoute } from "@react-navigation/native";

import ShopHeader from "@/app/src/components/ShopHeader"
import { RootStackParamList } from "../Router/Router";
import { View, Text,  } from "react-native";

type RouteParams = {
    id?: string | number;
};

const ProductPage = () => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const route = useRoute();
    const params = route.params as RouteParams;
    const id = params?.id ? Number(params.id) : undefined;


    const [data, setData] = React.useState<shopDto>()

    useEffect(() => {
        getDataId(Number(id))
            .then((response) => {
                setData(response.data)
            })
            .catch(e => console.log(e))
    }, [id]
    )


    console.log(id)

    return (
        <View>
            <ShopHeader
            />
            <Text>
                {data?.id}
            </Text>
            <Text
            >
                {data?.name}
            </Text>
            <Text
            >
                {data?.cost} ₽
            </Text>

            <View
            >
                {data?.image}
            </View>
            <View>
                <Text>
                    {data?.info}
                </Text>

            </View>

        </View>
    )
}

export default ProductPage