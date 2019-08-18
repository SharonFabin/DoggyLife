import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class UserInput extends Component {
    render() {
        return (
            <View style={styles.inputWrapper}>
                <Icon name={this.props.source} style={styles.inlineImg} size={20} color={'white'}/>
                <TextInput
                    style={styles.input}
                    placeholder={this.props.placeholder}
                    secureTextEntry={this.props.secureTextEntry}
                    autoCorrect={this.props.autoCorrect}
                    autoCapitalize={this.props.autoCapitalize}
                    returnKeyType={this.props.returnKeyType}
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                />
            </View>
        );
    }
}

UserInput.propTypes = {
    source: PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    returnKeyType: PropTypes.string,
};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: DEVICE_WIDTH - 40,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: '#ffffff',
    },
    inputWrapper: {
        flex: 1,
    },
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 70,
        height: 40,
        left: 35,
        top: 9,
    },
});