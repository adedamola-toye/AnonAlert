import Report from "../model/Report.js";
import { determineOrganization } from "../services/organizationService.js";

export async function autoAssignReports() {
  try {
    // find all reports that are not yet routed
    const unassignedReports = await Report.find({
      $or: [{ forwardedTo: null }, { status: "unassigned" }],
    });

    if (unassignedReports.length === 0) {
      console.log("No unassigned reports found.");
      return;
    }

    console.log(`Found ${unassignedReports.length} unassigned reports.`);

    for (const report of unassignedReports) {
      const newOrg = await determineOrganization(report.category, report.location);

      if (newOrg) {
        report.forwardedTo = newOrg;
        report.status = "pending";
        await report.save();
        console.log(`Report ${report._id} assigned to organization ${newOrg}`);
      } else {
        console.log(
          `Still no suitable org for category "${report.category}" in report ${report._id}`
        );
      }
    }

    console.log("Auto-assignment job completed.");
  } catch (error) {
    console.error("Error during auto-assignment job:", error);
  }
}
