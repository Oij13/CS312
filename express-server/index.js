import express, {} from 'express';
import { routHello, routApiNames, routeWeather } from "./routes.js";
const server = express();
const port = 3000;
server.get('/hello', function (_req, res) {
    const response = routHello();
    res.send(response);
});
server.get('/api/names', async function (_req, res) {
    let response;
    try {
        response = await routApiNames();
        res.send(response);
    }
    catch (error) {
        console.log(error);
    }
});
server.get('/api/weather/:zipcode', function (req, res) {
    const zipcode = req.params.zipcode;
    const response = routeWeather({ zipcode: zipcode });
    res.send(response);
});
server.listen(port, function () {
    console.log("Listening on port: " + port);
});
//# sourceMappingURL=index.js.map