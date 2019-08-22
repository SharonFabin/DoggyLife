import React, {Component} from 'react';
import {Dimensions, Image, ImageBackground, StyleSheet, View} from 'react-native';
import {Input, Text} from 'react-native-elements';
//import Input from '../components/Input';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {loginUser} from '../actions';
import AnimatedButton from "../components/AnimatedButton";
import {translate} from "../languageHelper";
import Icon from 'react-native-vector-icons/FontAwesome';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            text: translate("login")
        };

        this.onPressLogin.bind(this);
        this.checkSuccess = this.checkSuccess.bind(this);
        this.animatedButton = React.createRef();
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

    checkSuccess() {
        if (this.props.auth.errorLoging === '') {
            this.animatedButton.current.success();
            this.setState({
                text: ''
            });
            setTimeout(() => {
                Actions.app();
            }, 700);


        } else {
            this.animatedButton.current.errorOccurred();
        }

    }

    onPressLogin = () => {
        this.props.loginUser(this.state.user, this.state.password, this.checkSuccess);
    };

    onPressSignUp = () => {
        Actions.signup();
    };

    renderErrors() {
        if (this.props.auth.errorLoging !== '') {
            return (
                <View style={styles.errorsContainer}>
                    <Text style={styles.errorText}>{this.props.auth.errorLoging}</Text>
                </View>
            );
        }
        return;
    }

    render() {
        return (
            <ImageBackground style={styles.background}
                             source={{uri: "https://www.larutadelsorigens.cat/wallpic/full/10-104862_the-wallpaper-designer-material-design-wallpaper-green.jpg"}}
                             imageStyle={styles.backgroundImage}
            >
                <View style={styles.fullContainer}>
                    <Image
                        source={{uri: "https://cdn.freebiesupply.com/logos/large/2x/scooby-doo-7-logo-png-transparent.png"}}
                        style={styles.image}/>
                    <Text style={styles.text}>DOGGY LIFE</Text>
                    <View style={styles.container}>
                        <Input
                            placeholder={translate("username")}
                            leftIcon={<Icon name='user' size={24} color={'black'}/>}
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
                            placeholder={translate("password")}
                            leftIcon={<Icon name='eye' size={24} color={'black'}/>}
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
                    </View>
                    {this.renderErrors()}

                    <AnimatedButton
                        ref={this.animatedButton}
                        title={this.state.text}
                        onPress={this.onPressLogin}
                        loading={this.props.auth.loading}
                    />
                    <View style={styles.section}>
                        <Text style={styles.sectionText}>{translate("create account")}</Text>
                        <Text style={styles.sectionText}>{translate("forgot password")}</Text>
                    </View>
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


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%'
    },
    backgroundImage: {
        opacity: 0.8
    },
    fullContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginTop: 20,
        marginBottom: 40
    },
    errorsContainer: {
        alignItems: 'center',
        marginBottom: 10
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        textShadowColor: 'rgba(255, 0, 0, 0.9)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    section: {
        marginTop: 10,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    sectionText: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    image: {
        width: 80,
        height: 80
    },
    container: {

        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: DEVICE_WIDTH - 20,
        height: 40,
        marginBottom: 10,
    },
    inputInputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 0,
        backgroundColor: 'rgba(255,255,255,0.65)',

    },
    inputInput: {
        color: 'black',
        fontSize: 16,
        padding: 0,
        marginRight: 10


    },
    iconContainerStyle: {
        paddingRight: 10,
        width: 40,
    },
});
