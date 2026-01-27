import fetch from "node-fetch";

const routHello = (): string => "Hello World!";

const routApiNames = async (): Promise<string> => {
    const url = 'https://www.usemodernfullstack.dev/api/v1/users';
    let data: responseItemType[];

    try{
        const response = await fetch(url);
        data = (await response.json()) as responseItemType[];
    } catch(error){
        return "Error";
    }
    const names = (Array.isArray(data) ? data : [])
        .map(u => `${u.name} (ID: ${u.id})`)
        .join('<br>');

    return names
}

const routeWeather = (query: WeatherQueryInterface): WeatherDetailType =>
    queryWeatherData(query);

const queryWeatherData = (query: WeatherQueryInterface): WeatherDetailType => {
    return {
        zipcode: query.zipcode,
        weather: "sunny",
        temp: 35
    };
}

export{routHello,routApiNames,routeWeather};