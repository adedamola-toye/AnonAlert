import Report from "../model/Report.js";
import Organization from "../model/Organization.js";
import Location from "../model/Location.js";
import { updateReportStatusSchema } from "../validation/schemas/reportStatusSchema.js";
import { validateOrThrow } from "../validation/validationHelper.js";

export async function determineOrganization(reportCategory, reportLocationID) {
  try {
    const reportLocationObj = await Location.findById(reportLocationID);
    if (!reportLocationObj) {
      const error = new Error("Invalid location ID");
      error.statusCode = 404;
      throw error;
    }
    if (!reportLocationObj.state) {
      console.warn(`⚠️ Location ${reportLocationID} has no state field.`);
      return null; 
}
    const reportLocationState = reportLocationObj.state.toLowerCase();
    const normalizedReportCategory = reportCategory.toLowerCase();

    const routedOrg = await Organization.findOne({
      categoriesHandled: { $in: [normalizedReportCategory] },
      statesCovered: { $in: [reportLocationState] },
    });

    if (!routedOrg) {
      /* const error = new Error(
        `No suitable organization found for category ${reportCategory} in ${reportLocationObj.state}`
      );
      error.statusCode = 404;
      throw error; */
      console.warn(
        `⚠️ No suitable organization found for category "${reportCategory}" in "${reportLocationObj.state}". Report will be stored without routing.`
      );
      return null;
    }
    
    return routedOrg._id;
  } catch (error) {
    throw error;
  }
}

export async function updateStatus(newStatus, reportId, orgId) {
  const value = validateOrThrow(updateReportStatusSchema, {
    newStatus,
  });

  try {
    const reportToUpdate = await Report.findById(reportId);

    if (!reportToUpdate) {
      const error = new Error("Invalid Report ID");
      error.statusCode = 404;
      throw error;
    }

    if (reportToUpdate.forwardedTo.toString() !== orgId) {
      const error = new Error("Unauthorized: Not the assigned organization.");
      error.statusCode = 403;
      throw error;
    }
    reportToUpdate.status = value.newStatus;
    const updatedReport = await reportToUpdate.save();
    return updatedReport;
  } catch (error) {
    throw error;
  }
}

export async function getAllForwardedReportsService(orgId) {
  try {
    const reports = await Report.find({ forwardedTo: orgId });
    if (reports.length === 0) {
      const error = new Error("No reports found assigned to this NGO");
      error.statusCode = 404;
      throw error;
    }
    return reports;
  } catch (error) {
    throw error;
  }
}

export async function getSingleForwardedReportService(orgId, reportId){
  try{
    const report = await Report.findOne({
      forwardedTo: orgId,
      _id: reportId
    });

    if(!report){
      const error = new Error(`No report found with id: ${reportId} that was assigned to this organization`);
      error.statusCode = 404;
      throw error;
    }
    return report;
  }catch(error){
    throw error
  }
}
