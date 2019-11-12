import { homeReducer } from "./saga-home/reducers";
import { dashboardReducer} from "./dashboard/reducers";
import { combineReducers, createStore } from 'redux';
 
const rootReducer = combineReducers({
    homeReducer,
    dashboardReducer
});

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore() {
    const store = createStore(
        rootReducer
    );

    return store;
}