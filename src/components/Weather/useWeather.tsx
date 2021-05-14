import { memo, useEffect, useState } from 'react'
import moment from 'moment';
import { IWeather } from '../../interfaces';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Geocode from "react-geocode";

export default memo(function useWeather(props: IWeather) {

    const { day } = props;

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [watherState, setWatherState] = useState(
        {
            latitude: '',
            longitude: '',
            city: '',
            country: '',
            address: '',
            state: ''
        }
    )

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            setError("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    }

    const showPosition = (position: any) => {
        setWatherState(
            {
                ...watherState,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        )
    }

    useEffect(() => {
        if (watherState.latitude === '' && watherState.longitude === '') {
            Geocode.setApiKey("AIzaSyCzlgnJAA2B8ztbl3c56kJuURIWE1UTLXw");
            Geocode.setLanguage("en");
            getLocation();
        } else {
            if (watherState.country === '' && watherState.city === '') {
                Geocode.fromLatLng(watherState.latitude, watherState.longitude).then(
                    (response) => {
                        const address = response.results[0].formatted_address;
                        let city, state, country;
                        for (let i = 0; i < response.results[0].address_components.length; i++) {
                            for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                                switch (response.results[0].address_components[i].types[j]) {
                                    case "locality":
                                        city = response.results[0].address_components[i].long_name;
                                        break;
                                    case "administrative_area_level_1":
                                        state = response.results[0].address_components[i].long_name;
                                        break;
                                    case "country":
                                        country = response.results[0].address_components[i].long_name;
                                        break;
                                }
                            }
                        }

                        setLoading(false);
                        setWatherState(
                            {
                                ...watherState,
                                city,
                                country,
                                address,
                                state
                            }
                        )

                    },
                    (error) => {
                        setError("Google geocode error.");
                        setLoading(false);
                    }

                );
            }
        }
        // eslint-disable-next-line
    }, [watherState])

    return (
        <div>
            {moment().day(day === undefined ? 0 : day.day()).format('dddd')}
            {watherState.city}
            {watherState.country}
            {moment().day(day === undefined ? 0 : day.day()).format('dddd')}
            {loading ? <Loader type="Puff" color="#00BFFF" height={100} width={100} /> : <></>}
            {error === "" ? "" : error}
        </div>
    )
})
