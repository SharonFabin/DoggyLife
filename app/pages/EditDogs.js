import React, {Component} from 'react';
import {ActivityIndicator, Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import {Avatar, Input, Text} from 'react-native-elements';
import Button from '../components/Button';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {createUser} from '../actions/AuthActions';
import {translate} from "../languageHelper";
import Icon from "react-native-vector-icons/FontAwesome";
import AnimatedButton from "../components/AnimatedButton";
import {MaterialIndicator} from "react-native-indicators";
import ImagePicker from "react-native-image-crop-picker";
import {onSaveChanges} from "../actions";

class EditDogs extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ImageBackground style={styles.background}
                             source={{uri: "https://www.larutadelsorigens.cat/wallpic/full/10-104862_the-wallpaper-designer-material-design-wallpaper-green.jpg"}}
                             imageStyle={styles.backgroundImage}
            >
                <View style={styles.fullContainer}>
                    <Text h2 style={styles.text}>Meow?</Text>
                    <Avatar
                        rounded
                        source={{
                            uri: this.state.image ? `data:${this.state.image.mime};base64,${this.state.image.data}`
                                : "https://www.certified-parts.com/image/catalog/client/facebookanon.jpg"
                        }}
                        size={120}
                        title={this.state.username}
                        containerStyle={styles.avatar}
                        renderPlaceholderContent={<MaterialIndicator color='white'/>}
                        showEditButton
                        onEditPress={this.pickImage.bind(this)}
                    />
                    <View style={styles.container}>
                        <Input
                            placeholder={translate("email")}
                            leftIcon={<Icon name='envelope' size={24} color={'black'}/>}
                            leftIconContainerStyle={styles.iconContainerStyle}
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={styles.inputInputContainer}
                            inputStyle={styles.inputInput}
                            onSubmitEditing={() => {
                                this.secondInput.focus();
                            }}
                            // onChangeText={this.onChangeEmail.bind(this)}
                            // value={this.state.email}
                        />
                        <Input
                            placeholder={translate("username")}
                            leftIcon={<Icon name='user' size={24} color={'black'}/>}
                            leftIconContainerStyle={styles.iconContainerStyle}
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={styles.inputInputContainer}
                            inputStyle={styles.inputInput}
                            // onChangeText={this.onChangeUser.bind(this)}
                            ref={(input) => {
                                this.secondInput = input;
                            }}
                            onSubmitEditing={() => {
                                this.thirdInput.focus();
                            }}
                            // value={this.state.user}
                        />

                    </View>
                </View>


            </ImageBackground>
        );
    }


}
export default connect(
    null,
    {onSaveChanges}
)(EditDogs);

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
        marginBottom: 20
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
        marginTop: 20
    },
    inputContainer: {
        width: DEVICE_WIDTH - 20,
        height: 40,
        marginBottom: 20,
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
        fontSize: 18,
        padding: 0,
        marginRight: 10


    },
    iconContainerStyle: {
        paddingRight: 10,
        width: 40,
    },
    avatar: {
        borderColor: 'white',
        borderWidth: 2
    },
});
