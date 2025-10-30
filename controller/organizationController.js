import { updateStatus } from "../services/organizationService";

export async function updateStatusController(req, res) {
  try {
    const {reportId} = req.params;
    const { newStatus} = req.body;
    
    const updatedReport = await updateStatus(newStatus, reportId, req.orgId);
    return res.status(200).json({
      success: true,
      message: "Report status updated successfully",
      result: updatedReport,
    });
  } catch (error) {
    const errorMessage = error.message;
    const statusCode = error.statusCode || 500
    console.error(`Request failed with status ${statusCode}`, error);
    return res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "Internal Server Error" : errorMessage,
      details: error.message,
    });
  }
}
