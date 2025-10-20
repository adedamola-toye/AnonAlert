import reportSubmissionService from "../services/reportSubmissionService.js";

export async function createReport(req, res) {
  try {
    //Retrieve from request body - look for way to retrieve reporterId, forwardedTo
    //const { text, category, location } = req.body;
    //const reporterId = req.reporterId;
    //const files = req.files || [];
    const result = await reportSubmissionService.createReport(
      req.body,
      req.files
    );
    return res.status(201).json({
      success: true,
      message: "Report successfully created and media uploaded",
      report: result,
      trackingId: result.trackingId,
    });
  } catch (error) {
    const errorMessage = error.message;
    const statusCode =
      errorMessage.includes("required") ||
      errorMessage.includes("cannot be empty") ||
      errorMessage.includes("must be valid JSON") ||
      errorMessage.includes("is not allowed")
        ? 400
        : 500;

    console.error(`Request failed with status ${status}`, error);
    return res
      .status(statusCode)
      .json({
        success: false,
        message: statusCode === 500 ? "Internal Server Error" : errorMessage,
        details: error.message,
      });
  }
}
