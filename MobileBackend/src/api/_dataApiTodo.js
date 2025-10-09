import { createRequire } from "module";
const require = createRequire(import.meta.url);

const data = require('../../data/data.json');

import { updateJsonFile } from "../helpers/_updateJsonFiles.js";
import { searchIndexObjectDataParamId, searchObjectDataParamId } from "../helpers/_searchDatabase.js";

export const dataApiTodo = (app) => {

    //* get-запрос data
    app.get('/api/data-todo/', (req, res) => {
        return res.json(data.todoData);
    });

    //* get-запрос по id
    app.get('/api/data-todo/:id', (req, res) => {
        const idDataReq = req.params.id;
        console.log('start request id: ' + idDataReq);

        const dataResponse = searchObjectDataParamId(idDataReq, data.todoData);

        if (!dataResponse) {
            console.log('No id: ' + idDataReq);
            return res.status(404).send("Data not found");
        } else {
            res.json(dataResponse);
        }
    });

    //* post-запрос
    app.post('/api/data-todo/', (req, res) => {
        console.log('create new element ...');

        const idNewData = data.todoData[data.todoData.length - 1].id + 1;
        const crearedData = req.body;

        data.todoData.push({
            id: idNewData,
            title: crearedData.title,
            checked: crearedData.checked
        });

        updateJsonFile('data.json', data);

        console.log('created compled');

        return res.json(data.todoData[data.todoData.length - 1]);
    })

    //* put-запрос
    app.put('/api/data-todo/:id', (req, res) => {
        console.log('change data for id: ' + req.params.id);
        const idDataReq = req.params.id;
        const updatedData = req.body; //! Не сработает без - app.use(express.json());

        let indexDataTest = searchIndexObjectDataParamId(idDataReq, data.todoData);

        if (indexDataTest === -1) {
            console.log('No id: ' + idDataReq);
            return res.status(404).send("Data not found");
        } else {
            data.todoData[indexDataTest] = updatedData;
            updateJsonFile('data.json', data);
            res.json(data.todoData[indexDataTest]);
            console.log("completed change data");
        }
    });

    //* delete-запрос
    app.delete('/api/data-todo/:id', (req, res) => {
        console.log(`Delete ${req.params.id} ...`);

        const filterArray = data.todoData.filter((item) => item.id !== +req.params.id);

        data.todoData = filterArray;

        updateJsonFile('data.json', data);

        console.log(`Delete ${req.params.id} completed`);
        return res.status(204).send(`Delete ${req.params.id} completed`);
    })
}