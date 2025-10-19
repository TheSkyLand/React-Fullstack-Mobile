import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require('fs');

export const updateJsonFile = (file, data) => {
    fs.writeFileSync(`data/${file}`, JSON.stringify(data, null, 4)); // JSON.stringify(data) - форматирует json-файл в строку
}