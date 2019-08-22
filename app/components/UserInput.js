import React, {Component} from 'react';
import {Dimensions, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class UserInput extends Component {
    render() {
        const {style, placeholderTextColor, underlineColorAndroid, ...otherProps} = this.props;
        return (
            <View style={styles.inputWrapper}>
                <Icon name={this.props.source} style={styles.icon} size={20} color={'black'}/>
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
    inputWrapper: {
        marginBottom: 15,


        width: DEVICE_WIDTH - 40,
        height: 40
    },
    input: {

        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        borderRadius: 20,
        color: 'white',
        fontSize: 16
    },
    icon: {
        width: 40,
        alignSelf: 'center'
    },
});