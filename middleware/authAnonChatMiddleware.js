import jwt from "jsonwebtoken";
import { verifyAnonChatToken } from "../utils/verifyAnonChatToken.js";
export async function authAnonChatMiddleware(req, res, next) {
  try {
    const token = req.cookies.anon_chat_jwt;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No token found",
      });
    }
    const decodedPayload = await verifyAnonChatToken(token);
    req.chatReportId = decodedPayload.reportId;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Access Denied. Invalid or expired token",
      details: error.message,
    });
  }
}
