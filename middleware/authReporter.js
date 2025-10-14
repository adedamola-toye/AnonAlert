import {createAnonymousReporter} from "../services/reporterService";

const REPORTER_COOKIE_NAME = 'reporterToken';

export async function authenticateReporter(req, res, next){

    
    let reporterId = createAnonymousReporter(existingToken)
}