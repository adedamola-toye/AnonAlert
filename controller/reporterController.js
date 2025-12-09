import { getChatHistoryService } from "../services/chatService.js";
import Report from "../model/Report.js";
import { generateAnonChatToken } from "../utils/generateAnonChatToken.js";
import { verifyAnonChatToken } from "../utils/verifyAnonChatToken.js";
import { sendMessageByReporterService } from "../services/chatService.js";

export async function getChatHistory(req, res) {
  try {
    const trackingId = req.params.trackingId;
    const report = await Report.findOne({ trackingId: trackingId });
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "No report found for the tracking id ",
      });
    } 

    const reportId = report._id;
    //const reportId = req.chatReportId
    //check if token exists
    let tokenIsValid = false;
    const existingToken = req.cookies.anon_chat_jwt;
    if (existingToken && existingToken.length > 0) {
      try {
        const decodedPayload = await verifyAnonChatToken(existingToken);
        if (decodedPayload.reportId === reportId.toString()) {
          tokenIsValid = true;
        }
      } catch (error) {
        tokenIsValid = false;
        res.clearCookie("anon_chat_jwt", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
      }
    }
    else{
      tokenIsValid=false;
    }
    if (!tokenIsValid) {
      const newToken = await generateAnonChatToken(reportId);
      res.cookie("anon_chat_jwt", newToken, {
        httpOnly: true,
        maxAge: 1800000,
        // secure: process.env.NODE_ENV === 'production', // Use in production
        // sameSite: 'strict' // Recommended for CSRF protection
      });
    }

    const chatHistoryResult = await getChatHistoryService(reportId);
    return res.status(200).json({
      success: true,
      message: "Chat successfully received",
      chatHistoryResult: chatHistoryResult,
    });
  } catch (error) {
    const errorMessage = error.message;
    const statusCode = error.statusCode || 500;
    console.error(`Request failed with status ${statusCode}`, error);
    return res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "Internal Server Error" : errorMessage,
      details: error.message,
    });
  }
}



export async function sendMessageByReporter(req, res){
  //const trackingId = req.params.trackingId;
  const {messageText} = req.body;
  //const report = await Report.findOne({trackingId: trackingId})
  const reportId = req.chatReportId;
  try{
    const result = await sendMessageByReporterService({reportId, messageText});
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