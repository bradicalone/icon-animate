import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import combineReducers from './reducers'
import thunk from 'redux-thunk';

const initialState = {};
const store = createStore(
    combineReducers,
    initialState,
    applyMiddleware(thunk)
);

let fum = ((prop) => {
console.log('prop:', prop)


ReactDOM.render(
    <Provider store={store}>
        <App icon={{width: '40em'}}/>
    </Provider>,
    document.getElementById('app')
);

})();