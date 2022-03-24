import React, {useState} from 'react';
import useStyle from './styles'
import GoogleMapReact from 'google-map-react'
import {Paper, Typography, useMediaQuery} from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import {Rating} from "@material-ui/lab";

const Map = ({setCoordinates, coordinates, setBounds, places, setChildClicked, weatherData}) => {
    const classes = useStyle()
    const isDesktop = useMediaQuery('(min-width: 600px)')


    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={(e)=>{
                    setCoordinates({lat: e.center.lat, lng: e.center.lng})
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
                onChildClick={(child)=> setChildClicked(child)
                }
            >
                {places?.map((place, i)=> (
                    <div
                        key={i}
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}>
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color={'primary'} fontSize={'large'}/>
                            ): (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography gutterBottom className={''} variant={'subtitle2'}>
                                        {place.name}
                                    </Typography>
                                    <img className={classes.pointer} src={
                                        place.photo
                                            ? place.photo.images.large.url
                                            : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                                    } alt="img"/>
                                    <Rating size={'small'} value={Number(place.rating)} readOnly/>

                                </Paper>
                            )
                        }
                    </div>
                ))}
                {weatherData?.list?.map((data, i)=> (
                    <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
};

export default Map;
