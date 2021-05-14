import { ILocationInfo, IWeatherInfo } from ".";


export interface IState {
    weather: IWather
};


export interface IWather {
    locationState: ILocationInfo;
    weatherState: IWeatherInfo
};