export const fetchDogBreeds = () => {
    return fetch('https://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
            alert(Object.keys(responseJson));
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
};