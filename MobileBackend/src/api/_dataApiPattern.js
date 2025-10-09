import { createRequire } from "module";
const require = createRequire(import.meta.url);

const data = require('../../data/data.json');

import { updateJsonFile } from "../helpers/_updateJsonFiles.js";
import { searchIndexObjectDataParamId, searchObjectDataParamId } from "../helpers/_searchDatabase.js";

export const dataApiPattern = (app) => {

    //* get-запрос data
    app.get('/api/data/', (req, res) => {
        return res.json(data.dataTest);
    });

    //* get-запрос по id
    app.get('/api/data/:id', (req, res) => {
        const idDataReq = req.params.id;
        console.log('start request id: ' + idDataReq);

        const dataResponse = searchObjectDataParamId(idDataReq, data.dataTest);

        if (!dataResponse) {
            console.log('No id: ' + idDataReq);
            return res.status(404).send("Data not found");
        } else {
            res.json(dataResponse);
        }
    });

    //* post-запрос
    app.post('/api/data/', (req, res) => {
        console.log('create new element ...');

        let idNewData = 0;

        if (data.dataTest.length !== 0) {
            idNewData = data.dataTest[data.dataTest.length - 1].id + 1;
        }

        console.log(idNewData);
        const crearedData = req.body;

        data.dataTest.push({
            id: idNewData,
            name: crearedData.name,
            age: crearedData.age
        });

        updateJsonFile('data.json', data);

        console.log('created compled')

        return res.json(data.dataTest[data.dataTest.length - 1]);
    })

    //* put-запрос
    app.put('/api/data/:id', (req, res) => {
        console.log('change data for id: ' + req.params.id);
        const idDataReq = req.params.id;
        const updatedData = req.body; //! Не сработает без - app.use(express.json());

        let indexDataTest = searchIndexObjectDataParamId(idDataReq, data.dataTest);

        if (indexDataTest === -1) {
            console.log('No id: ' + idDataReq);
            return res.status(404).send("Data not found");
        } else {
            const newElement = {
                id: Number(idDataReq),
                name: updatedData.name,
                age: updatedData.age
            }

            data.dataTest[indexDataTest] = newElement;
            updateJsonFile('data.json', data);
            res.json(data.dataTest[indexDataTest]);
            console.log("completed change data");
        }
    });

    //* delete-запрос
    app.delete('/api/data/:id', (req, res) => {
        console.log(`Delete ${req.params.id} ...`);

        const filterArray = data.dataTest.filter((item) => item.id !== +req.params.id);

        data.dataTest = filterArray;

        updateJsonFile('data.json', data);

        console.log(`Delete ${req.params.id} completed`);
        return res.status(204).send(`Delete ${req.params.id} completed`);
    })
}