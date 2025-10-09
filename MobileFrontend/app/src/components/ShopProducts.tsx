import { createStackNavigator } from '@react-navigation/stack';
import { getData, getCommon } from "../api/controllers/new-controller"
import React, { useEffect } from "react"
import { shopDto } from "@/app/src/types/common/data.types"
import { Touchable, TouchableOpacity, View } from "react-native";

interface ShopGoodsProps {
    id: number
    name: string
    cost: number
    image: string
    info: string
}

const Stack = createStackNavigator();

const ShopProducts = (props: ShopGoodsProps, { navigation }: any) => {
    

    const [data, setData] = React.useState<shopDto[]>();

    useEffect(() => {
        getCommon()
            .then((response) => {
                console.log(response);
                setData(response.data.message);
            })
            .catch((e) => console.log(e));
    }, []);

    console.log(props.image)
    return <View
    >
        <TouchableOpacity onPress={() => navigation.navigate(`/product/${props.id}`)}>
            <View
            >
                <View>{props.name}</View>
                <View
                 

                >{props.image}
                    
                </View>
                <View
                >{props.cost} ₽</View>
                <TouchableOpacity></TouchableOpacity>
            </View>
        </TouchableOpacity>
    </View>
}


export default ShopProducts