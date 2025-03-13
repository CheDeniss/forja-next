import fs from "fs";
import https from "https";
import next from "next";

const app = next({ dev: true, hostname: "localhost", port: 3003 });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpsOptions = {
        key: fs.readFileSync("./certs/localhost-key.pem"), // Ключ
        cert: fs.readFileSync("./certs/localhost.pem"),   // Сертифікат
    };

    https.createServer(httpsOptions, (req, res) => handle(req, res))
        .listen(3003, () => {
            console.log("🚀 Next.js працює на HTTPS → https://localhost:3003");
        });
});
