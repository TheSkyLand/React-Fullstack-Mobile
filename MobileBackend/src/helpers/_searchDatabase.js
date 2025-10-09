/**
 * Поиск по id среди массива объекта с возвратом самого объекта
 * @param {number} idSearch
 * @param {Array} arrayData 
 * @returns {Object}
 */
export const searchObjectDataParamId = (idSearch, arrayData) => {
    return arrayData.find((item) => item.id === parseInt(idSearch));
}

/**
 * Поиск по id среди массива данных с возвратом номера положения объекта
 * @param {number} idSearch 
 * @param {Array} arrayData 
 * @returns {number} номер положения в массиве, если нет такого элемента, то возврат -1
 */
export const searchIndexObjectDataParamId = (idSearch, arrayData) => {
    return arrayData.findIndex((item) => item.id === parseInt(idSearch));
}