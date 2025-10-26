import Report from "../model/Report.js"
import Organization from "../model/Organization.js";
import Location from "../model/Location.js";
import {reportStatusSchema} from "../validation/schemas/reportStatusSchema.js"

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

export async function updateStatus(newStatus, reportId){
  const { error, value } = reportStatusSchema.validate({status: newStatus}, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    const errorMessages = error.details.map((detail) =>
      detail.message.replace(/['"]+/g, "")
    );
    throw new Error(errorMessages);
  }
  try{
    const reportToUpdate = await Report.findById(reportId)
    if(!reportToUpdate){
      const error = new Error("Invalid Report ID")
      error.statusCode = 404;
      throw error
    }
    reportToUpdate.status = value.status;
    await reportToUpdate.save();
    return reportToUpdate;
  }
  catch(error){
    throw error
  }
}
