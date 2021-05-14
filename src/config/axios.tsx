import axios from 'axios';

const API_Key = '4ea945df5a2d3402fe68008553d1797b';
const URL = "https://api.openweathermap.org/data/2.5/weather";

export const openweathermapApi = async (query: any) => {
    return await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_Key
        }
    })
}