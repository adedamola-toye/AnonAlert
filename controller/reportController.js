import {createReport, queryReport} from "../services/reportService.js";

export async function submitReport(req, res) {
  try {
    const result = await createReport(
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

    console.error(`Request failed with status ${statusCode}`, error);
    return res
      .status(statusCode)
      .json({
        success: false,
        message: statusCode === 500 ? "Internal Server Error" : errorMessage,
        details: error.message,
      });
  }
}

export async function getReportStatus(req, res){
  try{
    const trackingId = req.params.trackingId;
    const result = await queryReport(trackingId);
    return res.status(200).json({
      success: true,
      report: result
    })
  }catch(error){
    res.status(404).json({
      success: false,
      message: "Report not found",
      error
    })
  }
  
}


