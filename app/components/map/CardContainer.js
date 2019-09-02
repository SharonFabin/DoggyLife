import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Avatar, Card} from 'react-native-elements';


export default class CardContainer extends Component {
    render() {
        const {style, placeholderTextColor, underlineColorAndroid, ...otherProps} = this.props;
        return (
            <View>
                <Card title={"hi"} containerStyle={styles.card}>
                    <View>
                        <Avatar
                            source={{uri: "https://media.cntraveler.com/photos/5a85c3c3b8ebbd42565cf888/4:5/w_767,c_limit/Place-Trocadero_2018_GettyImages-521062958.jpg"}}
                            size={'large'}
                            title={"meow?"}
                            showEditButton
                        />
                    </View>
                </Card>
                <Card title={"hi"} containerStyle={styles.card}>
                    <View>
                        <Avatar
                            source={{uri: "https://media.cntraveler.com/photos/5a85c3c3b8ebbd42565cf888/4:5/w_767,c_limit/Place-Trocadero_2018_GettyImages-521062958.jpg"}}
                            size={'large'}
                            title={"meow?"}
                            showEditButton
                        />
                    </View>
                </Card>
            </View>


        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,

        margin: 0
    },
});