import React, { useEffect } from "react"
import { shopDto } from "@/app/types/common/data.types"
import { getData, getDataId } from "@/app/api/controllers/new-controller"
import ShopHeader from "@/app/ShopHeader"
import { View, Text, Image } from "react-native"
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native"

type RouteParams = {
    id?: string | number;
};

const ProductPage = () => {


    const [data, setData] = React.useState<shopDto>()
    const navigation = useNavigation();
    const route = useRoute();
    const params = route.params as RouteParams;
    const id = params?.id ? Number(params.id) : undefined;

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
            <ShopHeader />
            <Text
            >
                {data?.name}
            </Text>
            <Text
            >
                {data?.cost} ₽
            </Text>
            <Text>
                {data?.info}
            </Text>

        </View>
    )
}

export default ProductPage