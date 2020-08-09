const routes = require("./routes.js");
const express = require("express");
const app = express();
let server = require("http").createServer(app);
app.use(express.json());

const port = 5000;

routes.start(app);
app.listen(port, () => console.log(`server listening on port: ${port}!`));
