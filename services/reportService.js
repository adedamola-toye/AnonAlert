import { createReportSchema } from "../validation/schemas/reportSchema.js";
import Report from "../model/Report.js";
import { createLocation } from "./locationService.js";
import generateTrackingId from "../utils/generateTrackingId.js";
import { uploadMedia } from "./mediaService.js";
import { determineOrganization } from "./organizationService.js";
import { calculateCredibilityScore } from "./credibilityScoringService.js";

export async function createReport(info, files) {
  const { error, value } = createReportSchema.validate(info, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (error) {
    const errorMessages = error.details.map((detail) =>
      detail.message.replace(/['"]+/g, "")
    );
    throw new Error(errorMessages);
  }

  const { text, category, location } = value;
  const normalizedReportCategory = category.toLowerCase();


  let locationId;
  try {
    const locationObj = JSON.parse(location);

    locationId = await createLocation(locationObj);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Location data must be valid JSON");
    }

    throw error;
  }

  const trackingId = generateTrackingId();
  const mediaResult = await uploadMedia(files);
  const mediaIds = mediaResult.map(mediaItem => mediaItem.id);

  const credibilityScore = await calculateCredibilityScore(value, mediaResult)
  const routedOrg = await determineOrganization(category, locationId)

  const status = routedOrg ? "assigned/pending":"unassigned";
  const forwardedTo = routedOrg || null;
  //save the report
  try {
    const newReport = await Report.create({
      text: text,
      category: normalizedReportCategory,
      location: locationId,
      status,
      credibilityScore,
      forwardedTo,
      media: mediaIds,
      trackingId,
    });
    return newReport;
  } catch (error) {
    console.error("Error saving report: ", error);
    throw new Error("Error saving report:", error);
  }
}

export async function queryReport(id){

  try{
    const report = await Report.findOne({trackingId: id});
    if (report){
      return {
        text: report.text,
        media: report.media,
        category: report.category,
        location: report.location,
        status: report.status,
        forwardedTo: report.forwardedTo,
        createdAt: report.createdAt,
        tags: report.tags
      }
    }
  else{
    throw new Error("Report not found or invalid ID")
  }
  }catch(error){
    throw error
  }
  
}
