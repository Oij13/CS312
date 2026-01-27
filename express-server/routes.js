import fetch from "node-fetch";
const routHello = () => "Hello World!";
const routApiNames = async () => {
    const url = 'https://www.usemodernfullstack.dev/api/v1/users';
    let data;
    try {
        const response = await fetch(url);
        data = (await response.json());
    }
    catch (error) {
        return "Error";
    }
    const names = (Array.isArray(data) ? data : [])
        .map(u => `${u.name} (ID: ${u.id})`)
        .join('<br>');
    return names;
};
const routeWeather = (query) => queryWeatherData(query);
const queryWeatherData = (query) => {
    return {
        zipcode: query.zipcode,
        weather: "sunny",
        temp: 35
    };
};
export { routHello, routApiNames, routeWeather };
//# sourceMappingURL=routes.js.map