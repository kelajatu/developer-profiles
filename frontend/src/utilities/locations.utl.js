export const unpackLocations = (locationString) => {
    if(locationString){
        var userLocationSplit = locationString.split('_');
        return {
            locationId: userLocationSplit[0],
            locationName: userLocationSplit[1]
        }
    }
}

export const unpackPlaces = (userInfo) => {
    let newArr = []
    userInfo.places.split('|').forEach(place => {
        newArr.push(unpackLocations(place))
    })
    return newArr
}