
export const searchObjectDataParamId = (idSearch, arrayData) => {
    return arrayData.find((item) => item.id === parseInt(idSearch));
}

export const searchIndexObjectDataParamId = (idSearch, arrayData) => {
    return arrayData.findIndex((item) => item.id === parseInt(idSearch));
}



