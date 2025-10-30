import Report from "../model/Report.js"
import Organization from "../model/Organization.js";
import Location from "../model/Location.js";
import {reportStatusSchema} from "../validation/schemas/reportStatusSchema.js"
import { validateOrThrow } from "../validation/validationHelper.js";

export async function determineOrganization(reportCategory, reportLocationID) {
  try {
    const reportLocationObj = await Location.findById(reportLocationID);
    if (!reportLocationObj) {
      const error = new Error("Invalid location ID")
      error.statusCode = 404;
      throw error;
    }
    const reportLocationState = reportLocationObj.state;
    const routedOrg = await Organization.findOne({
      categoriesHandled: reportCategory,
      statesCovered: reportLocationState,
    });
    if (!routedOrg) {
      const error = new Error(`No suitable organization found for category ${reportCategory} in ${reportLocationObj.state}`)
      error.statusCode = 404;
      throw error;
    }
    return routedOrg._id;
  } catch (error) {
    throw error;
  }
}

export async function updateStatus(newStatus, reportId, orgId){
  
 const value = validateOrThrow(reportStatusSchema, {status:newStatus});

  try{
    const reportToUpdate = await Report.findById(reportId)
   
    if(!reportToUpdate){
      const error = new Error("Invalid Report ID")
      error.statusCode = 404;
      throw error
    }

     if (reportToUpdate.forwardedTo.toString() !== orgId){
      throw new Error("Unauthorized: Not the assigned organization.");
    }
    reportToUpdate.status = value.status;
    const updatedReport = await reportToUpdate.save();
    return updatedReport;
  }
  catch(error){
    throw error
  }
}

export async function getReports(orgId){
  try{
    const reports = await Report.find({forwardedTo : orgId})
    if(reports.length === 0){
      const error = new Error("No reports found assigned to this NGO")
      error.statusCode = 404;
      throw error
    }
    return reports
  }
  catch(error){
    throw error
  }
}
