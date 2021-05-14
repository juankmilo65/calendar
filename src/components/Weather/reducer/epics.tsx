import { getLocationInfoSuccess, getWeatherInfoSuccess, setStatus, GET_LOCATION_INFO, GET_WEATHER_INFO } from './actions';
import { switchMap, map } from "rxjs/operators";
import { ActionsObservable, ofType } from "redux-observable";
import { concat, of, from } from "rxjs";
import Geocode from "react-geocode";
import { ILocationInfo, IWeatherInfo } from '../../../interfaces';
import { openweathermapApi } from '../../../config/axios'


export default function controlDataWeatherEpic(actions$: ActionsObservable<any>) {
    return actions$.pipe(
        ofType(
            GET_LOCATION_INFO,
            GET_WEATHER_INFO
        ),
        switchMap((action): any => {
            if (action.type === GET_LOCATION_INFO) {
                Geocode.setApiKey("AIzaSyCzlgnJAA2B8ztbl3c56kJuURIWE1UTLXw");
                Geocode.setLanguage("en");
                return concat(
                    of(setStatus("pending")),
                    from(Geocode.fromLatLng(action.payload.latitude, action.payload.longitude)).pipe(
                        map((response: any) => {
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

                            return getLocationInfoSuccess({ city, state, country, address } as ILocationInfo);
                        })
                    )
                )
            } else if (action.type === GET_WEATHER_INFO) {
                return concat(
                    of(setStatus("pending")),
                    from(openweathermapApi(action.payload.city)).pipe(
                        map((response: any) => {

                            return getWeatherInfoSuccess({
                                city: response.data.name,
                                country: response.data.sys.country,
                                temp: Math.round(response.data.main.temp),
                                icon: response.data.weather[0].icon,
                                description: response.data.weather[0].description
                            } as IWeatherInfo);
                        })
                    )
                )
            }
        })
    )
}