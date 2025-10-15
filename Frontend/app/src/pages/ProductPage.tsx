import React, { useEffect } from "react"
import { shopDto } from "@/app/src/types/common/data.types"
import { getData, getDataId } from "@/app/src/api/controllers/new-controller"
import ShopHeader from "@/app/src/components/ShopHeader"
import { View } from "react-native"
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
            <View>
                {data?.id}
            </View>
            <View
            >
                {data?.name}
            </View>
            <View
            >
                {data?.cost} ₽
            </View>

            <View
            >
            </View>
            <View>
                <View>
                    {data?.info}
                </View>

            </View>

        </View>
    )
}

export default ProductPage