import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { useEffect, useState } from 'react';
import { grtPlacesData } from './api';

function App() {
    const [places, setPlaces] = useState([]);
    const [childClicked, setChildClicked] = useState(null)
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState(0)
    const [filteredPlaces, setFilteredPlaces] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setCoordinates({ lat: latitude, lng: longitude });
            }
        );

    }, []);


    useEffect(()=> {
        const filteredPlaces = places.filter((place)=> place.rating > rating)
        setFilteredPlaces(filteredPlaces)
    }, [rating])

    useEffect(() => {
        setIsLoading(true)
        grtPlacesData(type, bounds.sw, bounds.ne).then((data) => {
            setPlaces(data)
            setFilteredPlaces([])
            setIsLoading(false)
        });

    }, [type, coordinates, bounds]);

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;
