import React, {Component} from 'react';
import {Button, PermissionsAndroid, StyleSheet, View} from 'react-native';
import MapView, {AnimatedRegion, Marker} from "react-native-maps";
import {noLabelNightStyle, retroStyle} from "../constants/mapStyles";
import Geolocation from 'react-native-geolocation-service';
import {connect} from "react-redux";
import {updateLocation, watchLocation} from "../actions";
import markers from '../components/markers/markers';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 31.738318;
const LONGITUDE = 34.98372;


class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapStyle: retroStyle,
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
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
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
        this.setState({
            mapStyle: noLabelNightStyle
        });
        // Geolocation.getCurrentPosition(
        //     (position) => {
        //         console.log(position);
        //         this.setState({
        //             region: {
        //                 latitude: position.coords.latitude,
        //                 longitude: position.coords.longitude,
        //                 latitudeDelta: 0.0922,
        //                 longitudeDelta: 0.0421,
        //             }
        //         });
        //         this.props.updateLocation(this.state.longitude, this.state.latitude);
        //
        //     },
        //     (error) => {
        //         console.log(error.code, error.message);
        //     },
        //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        // );
    };

    renderMarks() {
        return this.props.location.locations.map(location =>
            <Marker coordinate={location} key={location.uid} title={location.uid}/>
        );
    }


    render() {


        return (
            <View style={styles.container}>
                <Button title="get location" onPress={this.getLocation.bind(this)}/>
                <MapView style={styles.map} customMapStyle={this.state.mapStyle}
                         initialRegion={{
                             latitude: LATITUDE,
                             longitude: LONGITUDE,
                             latitudeDelta: 0.02,
                             longitudeDelta: 0.02,
                         }}
                         region={{
                             latitude: LATITUDE,
                             longitude: LONGITUDE,
                             latitudeDelta: 0.02,
                             longitudeDelta: 0.02,
                         }}
                >
                    {this.renderMarks()}
                    {markers.markers.map(marker => (
                        <Marker
                            key={marker.id}
                            coordinate={{
                                latitude: marker.coordinate.latitude,
                                longitude: marker.coordinate.longitude
                            }}
                            title={marker.title}
                            icon={require('../assets/icons/park-icon2.png')}
                        />
                    ))}


                </MapView>
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
        height: '100%'
    }
});
