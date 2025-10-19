import { createRequire } from "module";


const require = createRequire(import.meta.url);

const express = require("express");

import { shopApi } from "./src/api/_shopApi.js";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

shopApi(app)
app.listen(PORT, () => {
	console.log(`Server starting on port ${PORT}`);
});
app.get('/shop', (req, res) => {
	res.json({
		message: 'Hello from backend server'
	})
});





