import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import weatherReducer         from "../components/Weather/reducer/reducer";
import controlDataWeatherEpic from '../components/Weather/reducer/epics'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['weather']
}

const rootEpic = combineEpics(controlDataWeatherEpic);
const epicMiddleware = createEpicMiddleware();
const rootReducer = combineReducers({
    weather: weatherReducer
});

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(epicMiddleware)));
epicMiddleware.run(rootEpic as any);

export default store;