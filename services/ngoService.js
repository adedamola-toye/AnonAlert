import Report from "../model/Report";
import NGO from "../model/NGO";
import Location from "../model/Location";
export async function determineNgo(reportId) {
  try {
    const report = await Report.findOne({ _id: reportId });
    if (!report) {
        const error = new Error("Report not found or invalid ID")
        error.statusCode = 404;
        throw error;
    }
    const reportCategory = report.category;

    const reportLocationID = report.location;

    const reportLocationObj = await Location.findOne({ _id: reportLocationID });
    if (!reportLocationObj) {
      const error = new Error("No report location found for the given report")
      error.statusCode = 404;
      throw error;
    }
    const reportLocationState = reportLocationObj.state;
    const routedNGO = await NGO.findOne({
      categoriesHandled: reportCategory,
      statesCovered: reportLocationState,
    });
    if (!routedNGO) {
      const error = new Error("No suitable NGO matching the report location and category found")
      error.statusCode = 404;
      throw error;
    }
    return routedNGO._id;
  } catch (error) {
    throw error;
  }
}
