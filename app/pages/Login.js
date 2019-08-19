import React, {Component} from 'react';
import {Dimensions, Image, ImageBackground, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
//import Input from '../components/Input';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {loginUser} from '../actions';
import UserInput from "../components/UserInput";
import AnimatedButton from "../components/AnimatedButton";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            text: 'LOGIN'
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
                             source={{uri: "https://www.rover.com/blog/wp-content/uploads/2018/04/ThinkstockPhotos-485251240-960x540.jpg"}}
                             imageStyle={styles.backgroundImage}
            >
                <View style={styles.fullContainer}>
                    <Image source={{uri: "http://materialdesignblog.com/wp-content/uploads/2015/10/1-Monstroid.png"}}
                           style={styles.image}/>
                    <Text style={styles.text}>DOGGY LIFE</Text>
                    <View>
                        <UserInput
                            source={'user'}
                            placeholder="Username"
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            onChangeText={this.onChangeUser.bind(this)}
                            onSubmitEditing={() => {
                                this.secondTextInput.focus();
                            }}
                            value={this.state.user}
                        />
                        <UserInput
                            source={'eye'}
                            secureTextEntry={true}
                            placeholder="Password"
                            returnKeyType={'done'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            refer={(input) => {
                                this.secondTextInput = input;
                            }}
                            onChangeText={this.onChangePassword.bind(this)}
                            value={this.state.password}
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
                        <Text style={styles.sectionText}>Create Account</Text>
                        <Text style={styles.sectionText}>Forgot Password?</Text>
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
    container: {
        flex: 1,
        alignItems: 'center',
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
    }
});
