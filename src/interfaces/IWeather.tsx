import moment from "moment";

export interface IWeather {
    city: string;
    country: string;
    day: moment.Moment | undefined;
}