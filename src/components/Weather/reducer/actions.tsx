import { ILocationInfo, ILocationRequest, IWatherRequest, IWeatherInfo } from "../../../interfaces";

export const SET_STATUS = "SET_STATUS";
export const GET_LOCATION_INFO = "GET_LOCATION_INFO";
export const GET_LOCATION_INFO_SUCCESS = "GET_LOCATION_INFO_SUCCESS";
export const GET_WEATHER_INFO = "GET_WEATHER_INFO";
export const GET_WEATHER_INFO_SUCCESS = "GET_WEATHER_INFO_SUCCESS";

export function setStatus(status: string) {
    return {
        type: SET_STATUS,
        payload: status
    }
}

export function getLocationInfo(locationRequest: ILocationRequest) {
    return {
        type: GET_LOCATION_INFO,
        payload: locationRequest
    }
}

export function getLocationInfoSuccess(locationInfo: ILocationInfo) {
    return {
        type: GET_LOCATION_INFO_SUCCESS,
        payload: locationInfo
    }
}

export function getWeatherInfo(watherRequest: IWatherRequest) {
    return {
        type: GET_WEATHER_INFO,
        payload: watherRequest
    }
}

export function getWeatherInfoSuccess(weatherInfo: IWeatherInfo) {
    return {
        type: GET_WEATHER_INFO_SUCCESS,
        payload: weatherInfo
    }
}