import React, {Component} from 'react';
import {PermissionsAndroid, StyleSheet, View} from 'react-native';
import MapView, {AnimatedRegion, Marker} from "react-native-maps";
import {niceStyle2} from "../constants/mapStyles";
import Geolocation from 'react-native-geolocation-service';
import {connect} from "react-redux";
import {updateLocation, watchLocation} from "../actions";
import markers from '../components/markers/markers';
import {Avatar, Card, Icon} from "react-native-elements";
import {translate} from "../languageHelper";

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 31.738318;
const LONGITUDE = 34.98372;


class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapStyle: niceStyle2,
            latitude: LATITUDE,
            longitude: LONGITUDE,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE
            }),
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            },
        };
    }

    componentDidMount() {
        this.requestLocationPermission();
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }
                });
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        );
        this.props.watchLocation();
        // this.watchID = Geolocation.watchPosition(
        //         //     position => {
        //         //         const {coordinate, routeCoordinates, distanceTravelled} = this.state;
        //         //         const {latitude, longitude} = position.coords;
        //         //
        //         //         const newCoordinate = {
        //         //             latitude,
        //         //             longitude
        //         //         };
        //         //         if (Platform.OS === "android") {
        //         //             if (this.marker) {
        //         //                 this.marker._component.animateMarkerToCoordinate(
        //         //                     newCoordinate,
        //         //                     500
        //         //                 );
        //         //             }
        //         //         } else {
        //         //             coordinate.timing(newCoordinate).start();
        //         //         }
        //         //         this.setState({
        //         //             latitude,
        //         //             longitude,
        //         //             routeCoordinates: routeCoordinates.concat([newCoordinate]),
        //         //             distanceTravelled:
        //         //                 distanceTravelled + this.calcDistance(newCoordinate),
        //         //             prevLatLng: newCoordinate
        //         //         });
        //         //     },
        //         //     error => console.log(error),
        //         //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        //         // );
    }

    calcDistance = newLatLng => {
        const {prevLatLng} = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    };

    requestLocationPermission = () => {
        try {
            const granted = PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });

    getLocation = () => {
        alert(this.state.region.latitude + " " + this.state.region.longitude);
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }
                });
                this.props.updateLocation(this.state.longitude, this.state.latitude);

            },
            (error) => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        );
    };

    renderUsersMarks() {
        return this.props.location.locations.map(location =>
            <Marker coordinate={location} key={location.uid} title={location.uid}/>
        );
    }

    renderPointsOfInterest() {
        return markers.markers.map(marker => (
            <Marker
                key={marker.id}
                coordinate={marker.coordinate}
                title={marker.title}
            >
                <Avatar
                    rounded
                    source={{uri: "https://www.newpawsibilities.com/wp-content/uploads/2018/10/kitana387.jpg"}}
                    size={'small'}
                    title={this.state.username}
                    containerStyle={styles.mapIcon}
                />
            </Marker>
        ))
    }

    renderFooter() {
        return (

            <Card title={translate("what are you looking for")} containerStyle={styles.card}>
                <View>
                    <Avatar
                        source={{uri: "https://media.cntraveler.com/photos/5a85c3c3b8ebbd42565cf888/4:5/w_767,c_limit/Place-Trocadero_2018_GettyImages-521062958.jpg"}}
                        size={'large'}
                        title={"meow?"}
                        showEditButton
                    />
                </View>
            </Card>
        );
    }


    render() {


        return (
            <View style={styles.container}>
                <MapView style={styles.map} customMapStyle={this.state.mapStyle}
                         initialRegion={{
                             latitude: LATITUDE,
                             longitude: LONGITUDE,
                             latitudeDelta: 0.02,
                             longitudeDelta: 0.02,
                         }}
                         region={this.state.region}
                >
                    {this.renderUsersMarks()}
                    {this.renderPointsOfInterest()}
                    {/*<Button title="get location" onPress={this.getLocation.bind(this)}/>*/}
                </MapView>
                <View style={styles.floating}>
                    {/*<Button title="get location" onPress={this.getLocation.bind(this)}/>*/}
                    <Icon
                        raised
                        name='gps-fixed'
                        type='material'
                        color='rgb(40,40,40)'
                        iconStyle={styles.iconStyle}
                        onPress={this.getLocation.bind(this)}
                    />
                    {this.renderFooter()}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    location: state.location
});

export default connect(
    mapStateToProps,
    {updateLocation, watchLocation}
)(Map);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    mapIcon: {
        borderColor: '#435158',
        borderWidth: 2
    },
    floating: {
        position: 'absolute',


        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
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
    iconStyle: {}
});
