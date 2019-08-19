import React, {Component} from 'react';
import {Dimensions, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class UserInput extends Component {
    render() {
        const {style, placeholderTextColor, underlineColorAndroid, ...otherProps} = this.props;
        return (
            <View style={styles.inputWrapper}>
                <Icon name={this.props.source} style={styles.inlineImg} size={20} color={'black'}/>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="black"
                    underlineColorAndroid="transparent"
                    ref={this.props.refer}
                    {...otherProps}
                />
            </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        width: DEVICE_WIDTH - 40,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: 'black',
        fontSize: 16
    },
    inputWrapper: {
        marginBottom: 15
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