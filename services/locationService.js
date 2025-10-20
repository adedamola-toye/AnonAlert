
import Location from "../model/Location.js"
import { createLocationSchema } from "../validation/schemas/locationSchema.js";
export async function createLocation(locationInfo) {
    const { error, value } = createLocationSchema.validate(locationInfo, {
        abortEarly: false,
        allowUnknown: false,
      });
      if (error) {
        const errorMessages = error.details.map((detail) =>
          detail.message.replace(/['"]+/g, "")
        );
        throw new Error(errorMessages);
      }

      const {city, street} = value;
    
    
    const reportLoc = await Location.create({
        city,
        street
    })

    return reportLoc._id;
}


