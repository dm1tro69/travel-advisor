import React from 'react';
import useStyle from './styles'

const PlaceDetails = ({place}) => {
    const classes = useStyle()
    return (
        <div>
            {place.name}
        </div>
    );
};

export default PlaceDetails;
