
import Location from "../model/Location"
async function createLocation(locationInfo) {
    if(!locationInfo.city){
        return "Location has to have city"
    }
    if(!locationInfo.street){
        return "Location has to have street"
    }
    
    const reporterLoc = await Location.create({
        city: locationInfo.city,
        street: locationInfo.street
    })

    return reporterLoc._id;
}


module.exports = {createLocation}