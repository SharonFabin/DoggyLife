import React, {Component} from 'react';
import RouterComponent from './Router';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducer from './reducers';
import {store} from './store';

export default class Main extends Component {
    render() {
        return (
            <Provider store={store}>
                <RouterComponent/>
            </Provider>
        );
    }
}

