import { IAction } from "../../../interfaces/IAction";

const initialState = {
    locationState: {
        city: '',
        country: '',
        address: '',
        state: ''
    },
    weatherState: {
        city: '',
        country: '',
        temp: '',
        icon: '',
        description: ''
    }
}

const weatherReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case "SET_STATUS": {
            return {
                ...state,
                status: action.payload
            };
        }
        case "GET_LOCATION_INFO_SUCCESS":
            return {
                ...state,
                locationState: action.payload
            }
        case "GET_WEATHER_INFO_SUCCESS":
            return {
                ...state,
                weatherState: action.payload
            }
        default:
            return state;
    }
}

export default weatherReducer;