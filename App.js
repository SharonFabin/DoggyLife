import React, {Component} from 'react';
import Main from './app/Main';
import * as RNLocalize from "react-native-localize";
import {setI18nConfig} from "./app/languageHelper";

export default class App extends Component {

    constructor(props) {
        super(props);
        setI18nConfig(); // set initial config
    }


    componentDidMount() {
        RNLocalize.addEventListener("change", this.handleLocalizationChange);
    }

    componentWillUnmount() {
        RNLocalize.removeEventListener("change", this.handleLocalizationChange);
    }

    handleLocalizationChange = () => {
        setI18nConfig();
        this.forceUpdate();
    };


    render() {
        
        return <Main/>;
    }
}
