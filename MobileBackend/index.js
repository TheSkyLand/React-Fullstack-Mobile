import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require("express");

import { dataApiPattern } from "./src/api/_dataApiPattern.js";
import { dataApiTodo } from "./src/api/_dataApiTodo.js";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

dataApiPattern(app);

dataApiTodo(app);

app.listen(PORT, () => {
	console.log(`Server starting on port ${PORT}`);
});

app.get('/api', (req, res) => {
	res.json({
		message: 'Hello from backend server'
	})
});