import firebase from "firebase";
import Geolocation from 'react-native-geolocation-service';
import {LOCATION_USERS_UPDATE, LOCATION_UPDATE} from "../constants/ActionTypes";
import {Actions} from "react-native-router-flux";
import {locationRef} from "../api/firebase";


const updateLocatoin1 = () => {
    this.watchID = Geolocation.watchPosition(position => {
            const {latitude, longitude} = position.coords;

            const newCoordinate = {
                latitude,
                longitude
            };

            if (Platform.OS === "android") {
                if (this.marker) {
                    this.marker._component.animateMarkerToCoordinate(
                        newCoordinate,
                        500
                    );
                }
            } else {
                coordinate.timing(newCoordinate).start();
            }
            this.setState({
                latitude,
                longitude,
                routeCoordinates: routeCoordinates.concat([newCoordinate]),
                distanceTravelled:
                    distanceTravelled + this.calcDistance(newCoordinate),
                prevLatLng: newCoordinate
            });
        },
        error => console.log(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
};

const trackLocation = () => {
    Geolocation.stop
    this.watchID = Geolocation.watchPosition(
        position => {
            const {coordinate, routeCoordinates, distanceTravelled} = this.state;
            const {latitude, longitude} = position.coords;

            const newCoordinate = {
                latitude,
                longitude
            };
            if (Platform.OS === "android") {
                if (this.marker) {
                    this.marker._component.animateMarkerToCoordinate(
                        newCoordinate,
                        500
                    );
                }
            } else {
                coordinate.timing(newCoordinate).start();
            }
            this.setState({
                latitude,
                longitude,
                routeCoordinates: routeCoordinates.concat([newCoordinate]),
                distanceTravelled:
                    distanceTravelled + this.calcDistance(newCoordinate),
                prevLatLng: newCoordinate
            });
        },
        error => console.log(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
};

const updateLocation = (longitude, latitude) => {
    const {currentUser} = firebase.auth();

    return dispatch => {
        firebase
            .database()
            .ref(`/locations/${currentUser.uid}/`)
            .update({
                longitude,
                latitude
            })
            .then(() => {
                dispatch({type: LOCATION_UPDATE});
            });
    };
};

const watchLocation = () => {
    const {currentUser} = firebase.auth();
    return (dispatch) => {
        firebase
            .database()
            .ref(`/locations/`)
            .on("value", function (snapshot) {
                updateUsersLocations(dispatch, snapshot.val());
            }, function (error) {
                console.log(error);
            });
    }
};

const updateUsersLocations = (dispatch, locations) => {
    const locationsArray = [];
    for (const key in locations) {
        locationsArray.push({
            uid: key,
            latitude: locations[key].latitude,
            longitude: locations[key].longitude
        });
    }
    dispatch({
        type: LOCATION_USERS_UPDATE,
        payload: locationsArray
    });
};

export {updateLocation, watchLocation};