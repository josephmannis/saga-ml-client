import { homeReducer } from "./saga-home/reducers";
import { dashboardReducer} from "./dashboard/reducers";
import { userReducer } from './user/reducers';
import { searchReducer } from './search/reducers';
import { combineReducers, createStore } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { initialize } from './backend';

initialize();

const persistConfig = {
    key: 'root',
    storage: storage,
};

const rootReducer = combineReducers({
    homeReducer,
    dashboardReducer,
    userReducer,
    searchReducer,
});

const pReducer = persistReducer(persistConfig, rootReducer);

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(pReducer);
export const persistor = persistStore(store);