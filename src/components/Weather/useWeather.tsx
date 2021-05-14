import { memo, useEffect, useState } from 'react'
import moment from 'moment';
import styled from 'styled-components';
import { getLocationInfo, getWeatherInfo } from './reducer/actions';
import { useDispatch, useSelector } from "react-redux";
import { ILocationInfo, ILocationRequest, IState, IWatherRequest, IWeather } from '../../interfaces';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Distribution = styled.div`
  display: grid;
  `;

export default memo(function useWeather(props: IWeather) {

    const locationInfo = useSelector((state: IState) => state.weather.locationState);
    const weatherState = useSelector((state: IState) => {
        return state.weather.weatherState
    });
    const { day } = props;
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [watherState, setWatherState] = useState(
        {
            latitude: '',
            longitude: ''
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
            getLocation();
        } else {
            dispatch(getLocationInfo({ latitude: watherState.latitude, longitude: watherState.longitude } as ILocationRequest));
        }
    }, [watherState])


    useEffect(() => {
        if (locationInfo.city !== '') {
            dispatch(getWeatherInfo({ city: locationInfo.city } as IWatherRequest));
        }

    }, [locationInfo])

    return (
        <Distribution>
            {`${weatherState.city} ${weatherState.country}`}
            <div>
                {weatherState.temp}
                <sup>&deg;C</sup>
            </div>

            <img src={`https://openweathermap.org/img/wn/${weatherState.icon}@2x.png`} alt={weatherState.description}></img>
            {moment().day(day === undefined ? 0 : day.day()).format('dddd')}
            {weatherState.city === '' ? <Loader type="Puff" color="#00BFFF" height={100} width={100} /> : <></>}
            {error === "" ? "" : error}
        </Distribution>
    )
})
