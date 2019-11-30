import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import {persistor, store} from './state/store';
import ConnectedApp from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { Button } from 'react-bootstrap';


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
