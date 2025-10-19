import { $api, config } from "../index";
import { shopDto } from "@/app/types/common/data.types";


export const getCommon = () => {
    return $api.get('/shop', { headers: config() });
}

export const getData = () => {
    return $api.get('/shop/data/', {headers: config() })
}

export const getDataId = (id: number) => {
    return $api.get(`/shop/data/${id}`, {headers: config() })
}

export const createData = (body: shopDto) => {
    return $api.post(`/shop/data/`, body, {headers: config() })
}

////////////////////////

export const editDataId = (id: number, body: shopDto) => {
    return $api.put(`/shop/data/${id}`, body, { headers: config() });
}

export const deleteDataId = (id: number) => {
    return $api.delete(`/shop/data/${id}`, { headers: config() });
}