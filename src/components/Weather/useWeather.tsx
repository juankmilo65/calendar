import { memo, useEffect, useState } from 'react'
import moment, { Moment } from 'moment';
import { IWeather } from '../../interfaces';
import { geolocated } from "react-geolocated";

export default memo(function useWeather(props: IWeather) {

    const { city, country, day } = props;
    const [error, setError] = useState("");



    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }

    const showPosition = (position: any) => {
        console.log("Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude);
    }

    useEffect(() => {
        getLocation()
    }, [])

    return (
        <div>
            {moment().day(day === undefined ? 0 : day.day()).format('dddd')}
        </div>
    )
})
