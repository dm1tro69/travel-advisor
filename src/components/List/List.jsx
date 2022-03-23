import React, {useState, createRef, useEffect} from 'react';
import useStyle from './styles'
import {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, Card} from "@material-ui/core";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({places, childClicked, isLoading}) => {
    const classes = useStyle()
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState(0)

   const [elRefs, setElRefs] = useState([])

    useEffect(()=> {
        const refs = Array(places?.length).fill().map((_, i)=> elRefs[i] || createRef())
        setElRefs(refs)
    }, [places])


    return (
        <div className={classes.container}>
            <Typography variant={'h4'}>
                Restaurants, Hotel & Attractions around you
            </Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size={'5rem'}/>
                </div>

            ): (
                  <>
                      <FormControl className={classes.formControl} style={{marginRight: '25px', marginBottom: '25px'}}>
                          <InputLabel>Type</InputLabel>
                          <Select value={type} onChange={(e)=> setType(e.target.value)}>
                              <MenuItem value={'restaurants'}>Restaurants</MenuItem>
                              <MenuItem value={'hotels'}>Hotels</MenuItem>
                              <MenuItem value={'attractions'}>Attractions</MenuItem>
                          </Select>
                      </FormControl>
                      <FormControl className={classes.formControl}>
                          <InputLabel>Rating</InputLabel>
                          <Select value={rating} onChange={(e)=> setRating(e.target.value)}>
                              <MenuItem value={0}>All</MenuItem>
                              <MenuItem value={3}>Above 3.0</MenuItem>
                              <MenuItem value={4}>Above 4.0</MenuItem>
                              <MenuItem value={4.5}>Above 4.5</MenuItem>
                          </Select>
                      </FormControl>
                      <Grid container spacing={3} className={classes.list}>
                          {places?.map((place, i)=> (
                              <Grid item key={i} xs={12}>
                                  <PlaceDetails
                                      place={place}
                                      selected={Number(childClicked) === i}
                                      refProps={elRefs[i]}
                                  />
                              </Grid>
                          ))}
                      </Grid>
                  </>
            )
            }

        </div>
    );
};

export default List;
