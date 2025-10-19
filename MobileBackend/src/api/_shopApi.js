import {
    createRequire
} from "module";
const require = createRequire(
    import.meta.url);
const data = require('../../data/shopdata.json')
import {
    updateJsonFile
} from "../helpers/_refreshData.js";
import {
    searchIndexObjectDataParamId,
    searchObjectDataParamId
} from "../helpers/_searchDatabase.js";





export const shopApi = (app) => {
    app.get('/shop/data', (req, res) => {
        return (
            res.json(data.productsData)
        )
    })

    app.get('/shop/data/:id', (req, res) => {

        const reqId = req.params.id;
        let resP = 'test'

        console.log('start request id: ' + reqId);

        //const dataResponse = searchObjectDataParamId(reqId, data.productsData);

        for (let i = 0; i < data.productsData.length; i++) {
            if (data.productsData[i].id == reqId) {
                resP = data.productsData[i]
            }
        }

        return (res.json(resP))
    });

    /////////////////////////////////////

    app.post('/shop/data/', (req, res) => {
        console.log('test');
        let idNewData = 0;

        if (data.productsData.length !== 0) {
            idNewData = data.productsData[data.productsData.length - 1].id + 1
        }

        console.log(idNewData)
        const createdData = req.body

        data.productsData.push({
            id: idNewData,
            name: createdData.name,
            cost: createdData.cost,
            info: createdData.info,
            image: createdData.image
        })

        updateJsonFile('shopdata.json', data);
        console.log('creation completed')

        return (
            res.json(data.productsData[data.productsData.length - 1])
        );
    })

    app.put('/shop/data/:id', (req, res) => {
        console.log('change data for id: ' + req.params.id);
        const idDataReq = req.params.id;
        const updatedData = req.body;

        let indexProductsData = searchIndexObjectDataParamId(idDataReq, data.productsData);

        if (indexProductsData === -1) {
            console.log('No id: ' + idDataReq);
            return (
                res.status(404).send("Data not found")
            );
        } else {
            const newElement = {
                id: Number(idDataReq),
                name: updatedData.name,
                cost: updatedData.cost,
                info: updatedData.info,
                image: updatedData.image
            }

            data.productsData[indexProductsData] = newElement;

            updateJsonFile('shopdata.json', data);

            res.json(data.productsData[indexProductsData]);
            console.log("completed change data");
        }
    });
    app.delete('/shop/data/:id', (req, res) => {
        console.log(`Delete ${req.params.id} ...`);

        const filterArray = data.productsData.filter((item) => item.id !== +req.params.id);

        data.productsData = filterArray;

        updateJsonFile('shopdata.json', data);

        console.log(`Delete ${req.params.id} completed`);
        return (
            res.status(204).send(`Delete ${req.params.id} completed`)
        );
    })
}