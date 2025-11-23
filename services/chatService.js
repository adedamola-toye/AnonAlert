import Chat from "../model/Chat.js";
import Report from "../model/Report.js";
export async function getChatHistoryService(reportId) {
  try {
    const chatHistory = await Chat.find({ reportId: reportId }).sort({
      createdAt: 1,
    });

    if (chatHistory.length === 0) {
      const error = new Error(
        "No chat history - could be that no conversation has begun"
      );
      error.statusCode = 404;
      throw error; 
      
    }
    return chatHistory;
  } catch (error) {
    console.error("Error retrieving chat history: ", error);
    throw error;
  }
}


export async function sendMessageByReporterService({reportId, messageText}){
  try{
    const report = await Report.findById(reportId);
    if(!report){
      const error = new Error(`Report with id: ${reportId} not found`);
      error.statusCode = 404;
      throw error;
    }
    const newChat = await Chat.create({
      reportId,
      senderType: "reporter",
      messageText
    });
    return newChat
  }catch (error) {
    console.error("Error saving chat: ", error);
    throw error;
  }
}



