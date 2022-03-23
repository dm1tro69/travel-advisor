import axios from "axios";

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'


export const grtPlacesData = async (sw, ne) => {
    try {
        const {data: {data}} = await axios.get(URL, {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY
            }
        })

        return data
    }catch (e) {
        console.log(e)
    }
}

