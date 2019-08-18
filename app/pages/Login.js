import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import {Button, Text} from 'react-native-elements';
//import Input from '../components/Input';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {loginUser} from '../actions';
import {MaterialIndicator,} from 'react-native-indicators';
import UserInput from "../components/UserInput";
import AnimatedButton from "../components/AnimatedButton";

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
        return (
            <ImageBackground style={styles.background}
                             source={{uri: "https://www.navitasventures.com/wp-content/uploads/2016/06/Material-design-background-514054880_2126x1416.jpeg"}}>
                <View style={styles.logoContainer}>
                    <Image source={{uri: "http://materialdesignblog.com/wp-content/uploads/2015/10/1-Monstroid.png"}}
                           style={styles.image}/>
                    <Text style={styles.text}>DOGGY LIFE</Text>
                </View>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <UserInput
                        source={'user'}
                        placeholder="Username"
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                    />
                    <UserInput
                        source={'lock'}

                        placeholder="Password"
                        returnKeyType={'done'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                    />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.btnEye}
                    >

                    </TouchableOpacity>
                </KeyboardAvoidingView>
                <View style={styles.section}>
                    <Text style={styles.sectionText}>Create Account</Text>
                    <Text style={styles.sectionText}>Forgot Password?</Text>
                </View>
                <AnimatedButton/>
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
    logoContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginTop: 20,
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
        flex: 1,
        top: 65,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    sectionText: {
        color: 'white',
        backgroundColor: 'transparent',
    },
});
