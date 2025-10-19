import { getData, getCommon } from "./api/controllers/new-controller"
import React, { useEffect } from "react"
import { shopDto } from "./types/common/data.types"
import { TouchableOpacity, View } from "react-native"
import { useNavigation, NavigationProp } from "@react-navigation/native"

interface ShopProductProps {
    id: number
    name: string
    cost: number
    image: string
    info: string
}

type RootStackParamList = {
    HomePage: undefined;
    MainPage: undefined;
    ProductAdd: undefined;
    ShopPage: undefined;
    CreateEdit: { id?: number };
    ProductPage: {id?: number};
};

const ShopProducts = (props: ShopProductProps) => {
    const [data, setData] = React.useState<shopDto>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

        const handlepress = (id : number) => {
            
        }
    

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
        <TouchableOpacity onPress={() => navigation.navigate("ProductPage", { id: props.id })}>
            <View>
                <View>
                    {props.name}
                    </View>
                <View>
                </View>
                <View
                >{props.cost} ₽
                </View>
            </View>
        </TouchableOpacity>
    </View>
}


export default ShopProducts