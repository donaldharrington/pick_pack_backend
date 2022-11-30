import express from "express";
import http from "http";
import https from "https";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import config from "./config/config.js";
import router from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const host = config.serverHost;
const port = config.serverPort;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/assets', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

app.use("/api/v1", router);

app.get("/.well-known/acme-challenge/F7gRJoQA7DbDXUoZdTLUAptqx72y4vAAnzBSJYkDLmI", (req, res) => {
    res.send("F7gRJoQA7DbDXUoZdTLUAptqx72y4vAAnzBSJYkDLmI.otye53fHenXM4a1l4pWC27qTs1MhyI-ms3qu76j8kWg");
});

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

if (fs.existsSync("/home/ubuntu/keys/privkey.pem")) {
    const options = {
        key: fs.readFileSync("/home/ubuntu/keys/privkey.pem"),
        cert: fs.readFileSync("/home/ubuntu/keys/cert.pem"),
        ca: fs.readFileSync("/home/ubuntu/keys/chain.pem"),
    };
    
    https.createServer(options, app).listen(443);

} else {
    const server = http.Server(app);

    server.listen(port, host, () => {
        // logger.info(`express server is running on ${host}:${port}`);
        console.log(`express server is running on ${host}:${port}`)
    });

    console.log("Server is running at port " + port);
}