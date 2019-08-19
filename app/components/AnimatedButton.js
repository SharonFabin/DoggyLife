import React, {Component} from 'react';
import {Animated, Dimensions, Easing, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';


const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;


export default class AnimatedButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };

        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
    }

    onPress() {
        if (this.props.loading) return;
        this.props.onPress();
        Animated.timing(this.buttonAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();
    }

    success() {
        Animated.timing(this.growAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();
    }

    errorOccurred() {
        Animated.timing(this.buttonAnimated, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
        }).start();
    }

    render() {


        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
        });
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, MARGIN],
        });

        return (
            <View style={styles.container}>
                <Animated.View style={{width: changeWidth}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPress}
                        activeOpacity={1}>
                        {this.props.loading ? (
                            <SkypeIndicator color={"white"} size={20}/>
                        ) : (
                            <Text style={styles.text}>{this.props.title}</Text>
                        )}
                    </TouchableOpacity>
                    <Animated.View
                        style={[styles.circle, {transform: [{scale: changeScale}]}]}
                    />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100,
    },
    circle: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
        borderWidth: 1,
        borderColor: 'orange',
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: 'orange',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    image: {
        width: 24,
        height: 24,
    },
});
