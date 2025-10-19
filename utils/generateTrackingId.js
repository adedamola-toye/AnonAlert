import { nanoid } from "nanoid";

export default function generateTrackingId(){
    let trackingId = nanoid(6);
    return trackingId
}

