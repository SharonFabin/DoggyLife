import React, {Component} from 'react';
import {Dimensions, Image, ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
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
            loading: true
        };
        this.animatedButtonRef = React.createRef();
        this.onPressLogin.bind(this);
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
        //this.props.loginUser(this.state.user, this.state.password);
        //alert("hi2");
        this.setState({
            loading: !this.state.loading
        });
        this.animatedButtonRef.current.changeSuccess(this.state.loading);
    };

    onPressSignUp = () => {
        Actions.signup();
    };


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
                            source={'lock'}
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
                        <Text>{this.props.auth.errorLoging}</Text>
                        <TouchableOpacity
                            onPress={this.updateAnimatedButton.bind(this)}
                        >
                            <Text>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                    <AnimatedButton
                        ref={this.animatedButtonRef}
                        title={"LOGIN"}
                        onPress={this.onPressLogin}
                        loading={this.state.loading}
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
    btnEye: {
        position: 'absolute',
        top: 55,
        right: 28,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
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
