import { updateStatus, getAllForwardedReportsService, getSingleForwardedReportService, getAllReportsByReducingCredibilityScoreService, sendMessageService } from "../services/organizationService.js";
import { getChatHistoryService } from "./chatService.js";

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

export async function getAllForwardedReports(req, res){
  try{
    const reports = await getAllForwardedReportsService(req.orgId)
    return res.status(200).json({
      success: true,
      message: "All forwarded reports retrieved successfully",
      result: reports,
    });
  }
  catch (error) {
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

export async function getSingleForwardedReport(req, res){
  try{
    const reportId = req.params.reportId
    const report= await getSingleForwardedReportService(req.orgId, reportId)
    return res.status(200).json({
      success: true,
      message: "Report retrieved successfully",
      result: report,
    });
  }
  catch (error) {
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

export async function getAllReportsByReducingCredibilityScore(req, res){
  try{
    const reports = await   getAllReportsByReducingCredibilityScoreService(req.orgId)
    return res.status(200).json({
      success: true,
      message: "All forwarded reports ranked and retrieved successfully",
      result: reports,
    });
  }
  catch (error) {
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

export async function sendMessage(req, res){
  const reportId = req.params.reportId
  const {messageText} = req.body;
  try{
    const result = await sendMessageService({orgId:req.orgId, reportId, messageText});
    return res.status(201).json({
      success: true,
      message: "Chat successfully sent",
      chat: result
    });
  }
  catch(error){
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

export async function getChatHistory(req, res){
  const reportId = req.params.reportId;
  try{
      const chatHistoryResult =await getChatHistoryService(reportId);
      return res.status(200).json({
        success: true,
        message:"Chat history successfully retrieved",
        chatHistory: chatHistoryResult
      })
  }
  catch(error){
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
