import axios from "axios";

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'


export const grtPlacesData = async () => {
    try {
        const {data: {data}} = await axios.get(URL, options)
        return data
    }catch (e) {
        console.log(e)
    }
}

const options = {
    method: 'GET',
    url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
    params: {
        bl_latitude: '11.847676',
        tr_latitude: '12.838442',
        bl_longitude: '109.095887',
        tr_longitude: '109.149359',
    },
    headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY
    }
};
