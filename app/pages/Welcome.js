import React, {Component} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {subscribeToAuthentication, unsubscribeFromAuthentication} from '../actions';
import {MaterialIndicator,} from 'react-native-indicators';

class Welcome extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.subscribeToAuthentication();
    }

    componentWillUnmount() {
        //this.props.unsubscribeFromAuthentication();
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
    {subscribeToAuthentication, unsubscribeFromAuthentication}
)(Welcome);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
