import * as React from "react";
import {StyleSheet, TextInput, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from "../constants/theme";

const blue = '#1a73e8';

class NiceInput extends React.Component {
    state = {
        isFocused: false
    };

    handleFocus = event => {
        this.setState({isFocused: true});
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    handleBlur = event => {
        this.setState({isFocused: false});
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    };

    render() {
        const {isFocused} = this.state;
        const {onFocus, onBlur, ...otherProps} = this.props;
        let inlineStyle = [];
        inlineStyle = inlineStyle.concat(styles.defaultStyle);
        if (this.props.customStyle) {
            inlineStyle = inlineStyle.concat(this.props.customStyle)
        }
        return (
            <View style={styles.inputContainer} borderBottomColor={isFocused ? blue : 'white'}>
                <Icon style={styles.icon} name={this.props.icon} size={20} color={isFocused ? blue : colors.black}/>
                <TextInput
                    selectionColor={blue}
                    underlineColorAndroid={'transparent'}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    style={inlineStyle}
                    ref={this.props.refer}
                    inlineImageLeft='username'
                    {...otherProps}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        height: 40,
        marginBottom: 10
    },
    icon: {
        paddingLeft: 10,
        paddingRight: 10
    },
    defaultStyle: {
        fontSize: 20,
        color: 'white',
    }
});

export default NiceInput;