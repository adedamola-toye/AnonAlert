//Service

import Reporter from "../model/Reporter";
import jwt from 'jsonwebtoken'
require('dotenv').config()

export async function createAnonymousReporter(token){
    let reporterId = null;
    let newToken = null;
    let isNew = false;

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            reporterId = decoded.reporterId;

            const reporter = await Reporter.findById(reporterId);
            if(reporter){
                return{
                    reporterId: reporter._id.toString(),
                    newToken: null,
                    isNew: false
                }
            }
        }
        catch(error){
            console.log("Existing JWT is invalid or expired. Creating a new session")
        }
    }

    const newReporter = await Reporter.create({});
    reporterId = newReporter._id.toString();
    isNew = true;

    const payload = {reporterId: reporterId}

    //payload here is telling us the user the jwt token we are signing belongs to.
    newToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1y'})
    return{
        reporterId,
        newToken,
        isNew
    }
}