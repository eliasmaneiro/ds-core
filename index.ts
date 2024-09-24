import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import { config } from "dotenv";
import router from "./src/router";

config();

const app = express();
const port = 3000;
app.set("secretKey", "nodeRestApi");
app.use(cors<express.Request>());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(router);

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
