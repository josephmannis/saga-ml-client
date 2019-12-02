import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ConnectedApp from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { persistor, store } from './state/store';


const Root = () => (
    <Provider store={store}>
        <PersistGate loading={<div> loading... </div>} persistor={persistor}>
            <ConnectedApp/>
        </PersistGate>
    </Provider>
)

ReactDOM.render(<Root/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
