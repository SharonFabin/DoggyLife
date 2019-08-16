import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet, ImageBackground, TextInput, TouchableOpacity} from 'react-native';
import {Input, Text, Button} from 'react-native-elements';
import NiceInput from '../components/NiceInput';
//import Input from '../components/Input';
import Title from '../components/Title';
import NiceButton from "../components/NiceButton";
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {loginUser, checkAuth} from '../actions';
import firebase from "firebase";
import {firebaseConfig} from '../settings';
import {WaveIndicator, MaterialIndicator,} from 'react-native-indicators';
import {fonts, colors, sizes} from '../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        };
    }

    onChangeUser = text => {
        this.setState({
            user: text
        });
    };

    onChangePassword = text => {
        this.setState({
            password: text
        });
    };

    onPressLogin = () => {
        this.props.loginUser(this.state.user, this.state.password);
    };

    onPressSignUp = () => {
        Actions.signup();
    };

    onPressMap = () => {
        Actions.map();
    };

    renderButtons() {
        if (this.props.auth.loading) {
            return (
                <View style={{height: 40}}>
                    <MaterialIndicator color="white"/>
                </View>
            );
        } else {
            return (
                <View style={styles.mid}>
                    <Button
                        title="Login"
                        onPress={this.onPressLogin.bind(this)}
                        buttonStyle={styles.buttonStyle}
                    />
                    <Button
                        title="Map"
                        onPress={this.onPressMap.bind(this)}
                        buttonStyle={styles.buttonStyle}
                    />
                    <Button
                        title="Forgot your password?"
                        onPress={this.onPressSignUp.bind(this)}
                        titleStyle={styles.text}
                        type="clear"
                    />
                    <Button
                        title="Signup"
                        onPress={this.onPressSignUp.bind(this)}
                        titleStyle={styles.text}
                        type="clear"
                    />
                </View>
            );
        }
    }

    render() {
        let pic = require('../assets/blur-bg.jpg');
        return (
            <ImageBackground
                source={pic}
                style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <Text h3 style={styles.title}>Doggy Meet</Text>
                    <Input
                        placeholder='Email'
                        leftIcon={<Icon name='user' size={24} color={colors.black}/>}
                        leftIconContainerStyle={styles.iconContainerStyle}
                        containerStyle={styles.inputContainer}
                        inputContainerStyle={styles.inputInputContainer}
                        inputStyle={styles.inputInput}
                        onChangeText={this.onChangeUser.bind(this)}
                        onSubmitEditing={() => {
                            this.secondTextInput.focus();
                        }}
                        value={this.state.user}
                    />
                    <Input
                        placeholder='Password'
                        leftIcon={<Icon name='eye' size={24} color={colors.black}/>}
                        leftIconContainerStyle={styles.iconContainerStyle}
                        containerStyle={styles.inputContainer}
                        inputContainerStyle={styles.inputInputContainer}
                        inputStyle={styles.inputInput}
                        ref={(input) => {
                            this.secondTextInput = input;
                        }}
                        onChangeText={this.onChangePassword.bind(this)}
                        value={this.state.password}
                        secureTextEntry
                    />
                    <Text>{this.props.auth.errorLoging}</Text>
                    {this.renderButtons()}
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {loginUser}
)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mid: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: 300,
        height: 50,
    },
    inputInputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'white'
    },
    inputInput: {
        color: 'white'
    },
    iconContainerStyle: {
        paddingRight: 10,
        width: 40,
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    },
    title: {
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    buttonStyle: {
        backgroundColor: colors.accent,
        borderRadius: sizes.radius,
        width: 200
    },
    headerWrapper: {
        borderBottomColor: colors.white,
        borderBottomWidth: 2,
        marginBottom: 30,
    },


    text: {
        color: 'white',
        fontSize: sizes.base,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
});
