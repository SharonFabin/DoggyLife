import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, ImageBackground, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {loginUser, checkAuth} from '../actions';
import {WaveIndicator, MaterialIndicator,} from 'react-native-indicators';
import {Button} from "react-native-elements";

class Welcome extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.checkAuth();
    }

    render() {
        let pic = require('../assets/jackk.jpg');
        return (
            <ImageBackground
                source={pic}
                style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <MaterialIndicator color='white' />
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    {checkAuth}
)(Welcome);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
