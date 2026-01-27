import express, {type Request, type Response} from 'express'; // Fixed TSC Error
import {routHello, routApiNames, routeWeather} from "./routes.js";

const server = express();
const port = 3000;

server.get('/hello', function(_req: Request, res: Response): void{
    const response = routHello();
    res.send(response);
});
server.get('/api/names', async function(_req: Request, res: Response): Promise<void>{
    let response: string;
    try{
        response = await routApiNames();
        res.send(response);
    } catch(error){
        console.log(error);
    }
});

server.get('/api/weather/:zipcode', function(req: Request, res: Response): void{
    const zipcode = req.params.zipcode as string; // Fixed TSC Error
    const response = routeWeather({zipcode: zipcode});
    res.send(response);
});


server.listen(port, function(): void
{
    console.log("Listening on port: " + port);
});